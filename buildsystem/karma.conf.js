const path = require('path');
const libraryConfig = require('./library.config');

module.exports = (config) => {
  config.set({

    basePath: '../', // TODO consider refactoring

    frameworks: ['jasmine', 'karma-typescript'],

    preprocessors: {
      '**/*.ts': ['karma-typescript'],
    },

    files: [
      './src/**/*.ts',
    ],

    reporters: ['progress', 'karma-typescript'],

    browsers: ['Chrome'], // TODO add more browsers

    singleRun: true,

  });
}