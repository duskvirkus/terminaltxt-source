const path = require('path');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

module.exports = (libraryConfig, buildType) => {

  const webpackBuildConfig = {
    context: path.resolve(__dirname, '../src/'),
    entry: './index.ts',
    output: {
      library: libraryConfig.name,
      libraryTarget: 'umd',
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

  if (buildType === 'development') {
    webpackBuildConfig.mode = 'development';
    webpackBuildConfig.output.path = path.resolve(__dirname, '../' + libraryConfig.devDir + '/');
    webpackBuildConfig.output.filename = libraryConfig.name + '.js'
  } else if (buildType === 'production') {
    webpackBuildConfig.mode = 'production',
    webpackBuildConfig.output.path = path.resolve(__dirname, '../' + libraryConfig.distDir + '/');
    webpackBuildConfig.output.filename = libraryConfig.name + '.js'
  } else {
    const errorMessage = "Invalid input in " + __filename + ". Expected 'development' or 'production' as buildType but received '" + buildType + "'.";
    eventEmitter.emit('error', new Error(errorMessage));
  }

  return webpackBuildConfig;
}