const path = require('path');
const libraryConfig = require('./library.config');

module.exports = (config) => {
  config.set({

    basePath: process.cwd() + '/src/',

    frameworks: [
      'jasmine-dom',
      'jasmine',
      'karma-typescript',
      'detectBrowsers',
    ],

    preprocessors: {
      '**/*.ts': ['karma-typescript', 'coverage'],
    },

    files: [
      '**/*.ts',
    ],

    reporters: [
      'coverage',
      'progress',
      'karma-typescript'
    ],

    coverageReporter: {
      type: 'text',
      dir: './coverage',
    },

    plugins: [
      'karma-typescript',
      'karma-coverage',
      'karma-jasmine',
      'karma-jasmine-dom',
      'karma-chrome-launcher',
      'karma-edge-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      'karma-safari-launcher',
      'karma-safaritechpreview-launcher',
      'karma-opera-launcher',
      'karma-phantomjs-launcher',
      'karma-electron-launcher',
      'karma-detect-browsers',
    ],

    singleRun: true,

  });
}