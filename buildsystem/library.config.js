const path = require('path');
const package = require('../package');

module.exports = () => {
  const libraryConfig = {
    name: '' || package.name,
    version: package.version,
    nameSpace: '' || package.name,

    // File Locations
    // Relative to root of project. Just dir names.
    srcDir: 'src',
    templateDir: 'buildsystem/templates',
    buildDir: 'build',
    distDir: 'build/dist',
    docsDir: 'docs',
    examplesDir: 'examples',

    buildRepository: 'https://github.com/figraham/picturesque-dist',

    // Examples
    examples: [
      {
        name: 'hello-world',
        repository: 'https://github.com/figraham/picturesque-helloworld-example',
      },
    ],
  };
  return libraryConfig;
}