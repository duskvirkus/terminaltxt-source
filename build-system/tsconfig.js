const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

module.exports = (libraryConfig, buildType) => {
  const tsconfig = {
    compilerOptions: {
      //outDir: '../' + libraryConfig.distDir + '/',
      moduleResolution: 'node',
      sourceMap: true,
      experimentalDecorators: true,
      target: 'es5',
      module: 'es2015',
      declaration: true,
      strict: true,
    },
    exclude: [
      'node_modules',
      '_jasmine',
      '**/*.spec.ts',
    ],
  };

  if (buildType === 'development') {
    tsconfig.compilerOptions.outDir = '../' + libraryConfig.devDir + '/';
  } else if (buildType === 'production') {
    tsconfig.compilerOptions.outDir = '../' + libraryConfig.distDir + '/';
  } else {
    const errorMessage = "Invalid input in " + __filename + ". Expected 'development' or 'production' as buildType but received '" + buildType + "'.";
    eventEmitter.emit('error', new Error(errorMessage));
  }

  return tsconfig;
}