const path = require('path');
const package = require('./package');

// -----------------------------------------------------------------------------
// Webpack Config
// Shared between development and production.
const webpackConfigCommon = {
  context: path.resolve(__dirname, 'src/picturesque'),
  entry: './index.ts',
  output: {
    library: package.name,
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      }
    ],
  },
};

const webpackConfigProduction = Object.assign({}, webpackConfigCommon, {
  mode: 'production',
  // TODO Finish
});

const webpackConfigDevelopment = Object.assign({}, webpackConfigCommon, {
  mode: 'development',
  //watch: true,
  output: {
    path: path.resolve(__dirname, 'build/dist'),
    filename: package.name + '.js',
  },
});

module.exports = (grunt) => {

  // ---------------------------------------------------------------------------
  // Config

  grunt.initConfig({

    // -------------------------------------------------------------------------
    // Shell

    shell: {
      cloneDist: {
        command: 'git clone https://github.com/figraham/picturesque-dist build',
      },
    },

    // -------------------------------------------------------------------------
    // Clean

    clean: {
      prebuild: ['./build'],
      development: ['./build/dist-dev'],
    },

    // -------------------------------------------------------------------------
    // Typescript

    ts: {
      // TODO Production
      // production: {
      //   tsconfig: './production.tsconfig.json',
      // },
      development: {
        tsconfig: './development.tsconfig.json',
      },
    },

    // -------------------------------------------------------------------------
    // Webpack

    webpack: {
      // See config objects near the top of the file.
      production: webpackConfigProduction,
      development: webpackConfigDevelopment,
    },

  });

  // ---------------------------------------------------------------------------
  // Load Tasks

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-webpack');

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
  ]);

  // Production Build
  grunt.registerTask('build:prod', ['build:common', 'build:production']);
  grunt.registerTask('build:production', [
    'notask', // TODO
  ]);

  // Development Build
  grunt.registerTask('build:dev', ['build:common', 'build:development']);
  grunt.registerTask('build:development', [
    'clean:development',
    //'ts:development',
    'webpack:development',
  ]);

  // ---------------------------------------------------------------------------
  // Testing

  // Default
  grunt.registerTask('test', ['test:all']);

  // All
  grunt.registerTask('test:all', [
    'notask',
  ]);

  // ---------------------------------------------------------------------------
  // Log Webpack Config

  grunt.registerTask('log:developmentConfig', () => {
    grunt.log.writeln("Development Webpack Config:");
    grunt.log.write(JSON.stringify(webpackConfigDevelopment, null, 2));
  });

  // ---------------------------------------------------------------------------
  // Helper Tasks

  grunt.registerTask('notask', () => {
    grunt.log.writeln("No Task Implemented Yet!")
  });

}