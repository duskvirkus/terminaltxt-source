const path = require('path');
const libraryConfig = require('./library.config.js')();
const examplesConfig = require('./examples.config.js')(libraryConfig);
const webpackConfigDevelopment = require('./webpack.config.js')(libraryConfig, 'development');
const webpackConfigProduction = require('./webpack.config.js')(libraryConfig, 'production');

module.exports = (grunt) => {

  // ---------------------------------------------------------------------------
  // Config

  grunt.initConfig({

    shell: Object.assign({}, {
      cloneDist: {
        command: 'git clone ' + libraryConfig.buildRepository + ' ' + libraryConfig.buildDir,
      },
    }, examplesConfig.shellCommands),

    clean: {
      prebuild: {
        src: ['./' + libraryConfig.buildDir],
      },
    },

    ts: { // TODO remove
      development: {
        tsconfig: './development.tsconfig.json',
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

    typedoc: { // TODO remove this
      docs: {
        options: {
          out: './' + libraryConfig.docsDir,
          target: 'es5', // TODO use library config after to do in tsconfig
          module: "es2015", // TODO save as target to do
          name: libraryConfig.name,
        },
        src: ['./' + libraryConfig.srcDir + '/*/**.ts']
      },
    },

    tslint: {
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
      src: {
        configFile: './' + libraryConfig.buildSystemDir + '/karma.conf.js',
      },
    },

  });

  // ---------------------------------------------------------------------------
  // Load Tasks

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-template');
  grunt.loadNpmTasks('grunt-typedoc');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-karma');

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
    //'ts:development',
    'webpack:development',
  ]);

  // ---------------------------------------------------------------------------
  // Documentation

  grunt.registerTask('docs', 'typedoc:docs');

  // ---------------------------------------------------------------------------
  // Testing

  grunt.registerTask('test', [
    'tslint',
    'karma',
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

  grunt.registerTask('notask', () => {
    grunt.log.writeln("No Task Implemented Yet!")
  });

}