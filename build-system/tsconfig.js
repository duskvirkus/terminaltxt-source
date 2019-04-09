module.exports = (libraryConfig) => {
  const tsconfig = {
    compilerOptions: {
      outDir: '../' + libraryConfig.distDir + '/',
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
      'jasmine',
      '**/*.spec.ts',
    ],
  };
  return tsconfig;
}