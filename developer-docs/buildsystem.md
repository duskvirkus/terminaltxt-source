# Build System

## Overview

This build system is heavily inspired by [excalibur.js](https://github.com/excaliburjs/Excalibur). It centralizes around the GruntFile.js in the build-system directory. It's designed with the intention that most higher level configurations can be changed in the library.config.js file.

## Grunt

Grunt is at the core of this setup it's used to run everything. Most of the important commands have been mapped to npm scripts.

### NPM Scripts / Grunt Tasks

|npm script|grunt task|description|
|----------|----------|---|
|build     |build     |Will create both development and production builds. Also runs testing and docs.|
|build:dev |build:dev |Creates only development build will not run tests for faster development.|
|build:push|build:push|Will run a build and then attempt to push it to the distribution repository. Must have permissions to push to that repository.|
|test      |test      |Will run both typescript linting and jasmine tests using karma.|
|travis    |travis    |Testing command used by Travis CI. Main difference is it runs karma in headless browsers. Can be run locally to see if travis will pass.|
|docs      |docs      |Generates documentation using typedoc.|
|examples  |examples  |Will clone all examples listed in the library config file.|

All these scripts can be run using `npm run <script>`. For verbose output use `npm run <script>:v`.

### Grunt Tasks

|grunt script         |description|
|---------------------|---|
|lint                 |Will run typescript linting.|
|karma:local          |Use to run just karma testing.|
|log:libraryConfig    |Can be used to double check the contents of library.config.js.|
|log:gruntConfig      |Used to show all grunt configurations with expanded objects.|
|log:developmentConfig|Can be used to show webpack config for the development build.|
|log:productionConfig |Can be used to show webpack config for the production build.|

Can be run from the root directory of the project with `grunt <task> --base ./ --gruntfile ./build-system/GruntFile.js`. Append `-v` to get verbose readout.

`grunt --base ./ --gruntfile ./build-system/GruntFile.js --help` will show all registered tasks, however some of them are not meant to be run independently.

## Karma

### Browsers

Karma will run tests in multiple browsers. It uses the full applications when running testing on a development machine and headless browsers when running tests on Travis CI. When running the testing browsers should pop up this is nothing to be alarmed about. 'karma-detect-browsers' should automatically check to see which browsers you have available. However, if you encounter problems the first thing to look at is electron because that is added regardless of if it is detected or not.
