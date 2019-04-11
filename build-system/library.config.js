const path = require('path');
const package = require('../package');

module.exports = () => {
  const libraryConfig = {
    name: '' || package.name,
    version: package.version,
    nameSpace: 'termtxt' || package.name,

    // File Locations
    // Relative to root of project. Just dir names.
    buildSystemDir: 'build-system',
    templateDir: 'build-system/templates',
    buildDir: 'build',
    devDir: 'build/dev',
    distDir: 'build/dist',
    docsDir: 'docs',
    examplesDir: 'examples',

    buildRepository: 'https://github.com/figraham/terminaltxt-distribution',

    // Examples
    examples: [
      {
        name: 'hello-world',
        repository: 'https://github.com/figraham/terminaltxt-helloworld',
      },
    ],
  };
  return libraryConfig;
}