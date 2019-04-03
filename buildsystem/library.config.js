const path = require('path');
const package = require('../package');

module.exports = () => {
  const libraryConfig = {
    name: '' || package.name,
    version: package.version,
    nameSpace: '' || package.name,

    buildRespository: 'https://github.com/figraham/picturesque-dist',

    // File Locations
    // Reletave to root of project. Just dir names.
    templateDir: 'buildsystem/templates',
    buildDir: 'build',
    distDir: 'build/dist',
  };
  return libraryConfig;
}