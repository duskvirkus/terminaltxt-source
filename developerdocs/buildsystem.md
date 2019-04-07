# Build System

## Karma

### Browsers

Karma will run tests in multiple browsers. It uses the full applications when running testing on a development machine and headless browsers when running tests on Travis CI. Below are a couple notes on each browser.

- Chrome
  - Dependencies: karma-chrome-launcher

- Firefox
  - Dependencies: karma-firefox-launcher

- Electron
  - Dependencies: karma-electron-launcher, electron
  - Can't be run headless so it's not check in Travis CI.

