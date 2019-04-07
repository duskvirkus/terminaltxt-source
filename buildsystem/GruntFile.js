const path = require('path');
const libraryConfig = require('./library.config.js')();
const tsConfig = require('./tsconfig.js')(libraryConfig);
const examplesConfig = require('./examples.config.js')(libraryConfig);
const webpackConfigDevelopment = require('./webpack.config.js')(libraryConfig, 'development');
const webpackConfigProduction = require('./webpack.config.js')(libraryConfig, 'production');

module.exports = (grunt) => {

  // ---------------------------------------------------------------------------
  // Config

  grunt.initConfig({

    shell: Object.assign({}, {
      cloneDist: { // TODO change name
        command: 'git clone ' + libraryConfig.buildRepository + ' ' + libraryConfig.buildDir,
      },
      typedoc: {
        command: 'typedoc --out ./' + libraryConfig.docsDir + 
        ' --target ' + tsConfig.compilerOptions.target + 
        ' --module ' + tsConfig.compilerOptions.module + 
        ' --name ' + libraryConfig.name + 
        ' --readme ./README.md' + 
        ' --tsconfig ./' + libraryConfig.srcDir + '/' + libraryConfig.name + '/tsconfig.json' + 
        ' --exclude **/index.ts',
      }
    }, examplesConfig.shellCommands),

    clean: {
      prebuild: {
        src: ['./' + libraryConfig.buildDir],
      },
      tsconfig: {
        src: ['./' + libraryConfig.srcDir + '/' + libraryConfig.name + '/tsconfig.json'],
      },
    },

    webpack: {
      // See webpack.config.js file.
      production: webpackConfigProduction,
      development: webpackConfigDevelopment,
    },

    template: {
      typings: {
        options: {
          data: {
            nameSpace: libraryConfig.nameSpace,
          }
        },
        files: [{
          dest: './' + libraryConfig.distDir + '/' + libraryConfig.name + '.d.ts',
          src: './' + libraryConfig.templateDir + '/typings.d.ts.template',
        }],
      },
    },

    examples: examplesConfig.exampleTaskLists,

    tslint: { // TODO consider separate file
      options: {
        configuration: {
          extends: [
            'tslint:latest'
          ],
          rules: {
            "adjacent-overload-signatures": true,
            "member-access": true,
            "ban-comma-operator": true,
            "function-constructor": true,
            "label-position": true,
            "no-arg": true,
            "no-conditional-assignment": true,
            "no-construct": true,
            "no-duplicate-switch-case": true,
            "no-any": true,
            "curly": true,
            "no-sparse-arrays": true,
            "no-var-keyword": true,
            "prefer-const": true,
            "array-type": [true, "array"],
            "one-variable-per-declaration": true,
            "variable-name": [
              true,
              "ban-keywords",
              "check-format",
              "require-const-for-all-caps",
              "allow-leading-underscore",
            ]
          },
        },
        project: path.resolve(__dirname, '../' + libraryConfig.srcDir + '/' + libraryConfig.name + '/tsconfig.json'),
        fix: true,
      },
      src: {
        src: './' + libraryConfig.srcDir + '/' + libraryConfig.name + '/**/*.ts',
      },
    },

    karma: {
      local: {
        configFile: './' + libraryConfig.buildSystemDir + '/karma.conf.js',
        browsers: ['Chrome', 'Firefox', 'Electron', 'Edge'],
      },
      travis: {
        configFile: './' + libraryConfig.buildSystemDir + '/karma.conf.js',
        browsers: ['ChromeHeadless', 'FirefoxHeadless'],
      }
    },

    json_generator: {
      tsconfig: {
        dest: './' + libraryConfig.srcDir + '/' + libraryConfig.name + '/tsconfig.json',
        options: tsConfig,
      },
    },

  });

  // ---------------------------------------------------------------------------
  // Load Tasks

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-template');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-json-generator');

  // ---------------------------------------------------------------------------
  // Builds

  // Default
  grunt.registerTask('build', ['build:both']);

  // Both
  grunt.registerTask('build:both', [
    'build:common',
    'build:production',
    'build:development',
  ]);

  // Common
  grunt.registerTask('build:common', [
    'clean:prebuild',
    'shell:cloneDist',
    'template:typings',
  ]);

  // Production Build
  grunt.registerTask('build:production', [
    // TODO add min version
    'test',
    'docs',
  ]);

  // Development Build
  grunt.registerTask('build:dev', ['build:common', 'build:development']);
  grunt.registerTask('build:development', [
    'json_generator:tsconfig',
    'webpack:development',
    'clean:tsconfig',
  ]);

  // ---------------------------------------------------------------------------
  // Documentation

  grunt.registerTask('docs', 'typedoc');

  grunt.registerTask('typedoc', [
    'json_generator:tsconfig',
    'shell:typedoc',
    'clean:tsconfig',
  ]);

  // ---------------------------------------------------------------------------
  // Linting

  grunt.registerTask('lint', [
    'json_generator:tsconfig',
    'tslint',
    'clean:tsconfig',
  ]);

  // ---------------------------------------------------------------------------
  // Testing

  grunt.registerTask('test', [
    'lint',
    'karma:local',
  ]);

  // ---------------------------------------------------------------------------
  // Travis

  grunt.registerTask('travis', [
    'travis:test',
    'travis:build',
  ]);

  grunt.registerTask('travis:build', [
    'build:dev',
    'docs',
  ]);

  grunt.registerTask('travis:test', [
    'lint',
    'karma:travis',
  ]);

  // ---------------------------------------------------------------------------
  // Examples

  grunt.registerMultiTask('examples', function() {
    for (let i = 0; i < this.data.tasks.length; i++) {
      grunt.task.run(this.data.tasks[i] + ':' + this.target);
    }
  });

  // ---------------------------------------------------------------------------
  // Log Configs

  grunt.registerTask('log:developmentConfig', () => {
    grunt.log.writeln("Development Webpack Config:");
    grunt.log.write(JSON.stringify(webpackConfigDevelopment, null, 2));
  });

  grunt.registerTask('log:libraryConfig', () => {
    grunt.log.writeln("Library Config:");
    grunt.log.write(JSON.stringify(libraryConfig, null, 2));
  });

  grunt.registerTask('log:gruntConfig', () => {
    grunt.log.writeln("Grunt Config:");
    grunt.log.write(JSON.stringify(grunt.config(), null, 2));
  });

  // ---------------------------------------------------------------------------
  // Helper Tasks

  grunt.registerTask('notask', () => { // TODO Remove
    grunt.log.writeln("No Task Implemented Yet!")
  });

}