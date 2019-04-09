# Build System

## Karma

### Browsers

Karma will run tests in multiple browsers. It uses the full applications when running testing on a development machine and headless browsers when running tests on Travis CI. When running the testing browsers should pop up this is nothing to be alarmed about. 'karma-detect-browsers' should automatically check to see which browsers you have available. However, if you encounter problems the first thing to look at is electron because that is added regardless of if it is detected or not.
