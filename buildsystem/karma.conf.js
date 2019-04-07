const path = require('path');
const libraryConfig = require('./library.config');

module.exports = (config) => {
  config.set({

    basePath: '../', // TODO consider refactoring

    frameworks: ['jasmine', 'karma-typescript'],

    preprocessors: {
      '**/*.ts': ['karma-typescript', 'coverage'],
    },

    files: [
      './src/**/*.ts',
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

    browsers: [''],

    singleRun: true,

  });
}