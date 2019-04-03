const path = require('path');
const libraryConfig = require('./library.config.js')();

const webpackConfigDevelopment = require('./webpack.config.js')(libraryConfig, 'development');
const webpackConfigProduction = require('./webpack.config.js')(libraryConfig, 'production');

module.exports = (grunt) => {

  // ---------------------------------------------------------------------------
  // Config

  grunt.initConfig({

    shell: {
      cloneDist: {
        command: 'git clone ' + libraryConfig.buildRespository + ' ' + libraryConfig.buildDir,
      },
    },

    clean: {
      prebuild: {
        src: ['./' + libraryConfig.buildDir],
      },
    },

    ts: { // TODO remove
      // TODO Production
      // production: {
      //   tsconfig: './production.tsconfig.json',
      // },
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

  });

  // ---------------------------------------------------------------------------
  // Load Tasks

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-template');

  // ---------------------------------------------------------------------------
  // Builds

  // Default
  grunt.registerTask('build', ['build:both']);

  // Both
  grunt.registerTask('build:both', [
    'build:common',
    'build:development',
    'build:production',
  ]);

  // Common
  grunt.registerTask('build:common', [
    'clean:prebuild',
    'shell:cloneDist',
    'template:typings',
  ]);

  // Production Build
  grunt.registerTask('build:production', [
    'notask', // TODO
  ]);

  // Development Build
  grunt.registerTask('build:dev', ['build:common', 'build:development']);
  grunt.registerTask('build:development', [
    //'ts:development',
    'webpack:development',
  ]);

  // ---------------------------------------------------------------------------
  // Testing

  // Default
  grunt.registerTask('test', ['test:all']);

  // All
  grunt.registerTask('test:all', [
    'notask', // TODO
  ]);

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