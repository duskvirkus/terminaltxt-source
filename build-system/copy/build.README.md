# TerminalTXT Distribution

[![Build Status](https://travis-ci.org/figraham/terminaltxt-source.svg?branch=master)](https://travis-ci.org/figraham/terminaltxt-source)
[![NPM version](https://img.shields.io/npm/v/terminaltxt.svg)](https://www.npmjs.com/package/terminaltxt)

Distribution of [TerminalTXT Library](https://github.com/figraham/terminaltxt-source). Please see the source repository for source code and documentation.

**Please Note**:
- If viewing this on NPM then the issues count isn't right. The issues can be found on the [source repository](https://github.com/figraham/terminaltxt-source/issues).
- NPM version numbering doesn't apply to packages below 0.1.0, due to early development.

## Release Notes

### 0.0.3

- Added InputTracker to handle user keyboard input.

### 0.0.2

- Fixing NPM package.json

### 0.0.1

First working version of the library. Very minimal features.

- Has basic GraphicsTerminal with `setCell()` and `update()`.
- CharacterSet supports both string and number[] constructors. As well as unknown characters.
- DOM elements are created with classes and ids.