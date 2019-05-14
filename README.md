# TerminalTXT

[![Build Status](https://travis-ci.org/figraham/terminaltxt-source.svg?branch=master)](https://travis-ci.org/figraham/terminaltxt-source)
[![NPM version](https://img.shields.io/npm/v/terminaltxt.svg)](https://www.npmjs.com/package/terminaltxt)

This is a web based creative coding library / game engine for ASCII and text art reminiscent of Terminal graphics.

## Table of Contents

- [Getting Started](https://github.com/figraham/terminaltxt-source#getting-started)
  - [Minimal Example](https://github.com/figraham/terminaltxt-source#using-the-minimal-example)
  - [NPM](https://github.com/figraham/terminaltxt-source#installing-through-npm)
- [Examples](https://github.com/figraham/terminaltxt-source#examples)
- [Projects](https://github.com/figraham/terminaltxt-source#projects)
- [Documentation](https://github.com/figraham/terminaltxt-source#documentation)

## Getting Started

### Using the Minimal Example

Be sure git and npm (is bundled with node.js) are installed on your machine. Then use:

```bash
git clone https://github.com/figraham/terminaltxt-minimal.git
cd terminaltxt-minimal
npm i
npm start
```

That's all you need to get started playing around. Check out the [documentation](https://github.com/figraham/terminaltxt-source#documentation) and [examples](https://github.com/figraham/terminaltxt-source#examples) below to see how to use the library.

### Installing Through NPM

After `npm init` then run `npm i terminaltxt`.

I recommend also using [parcel](https://parceljs.org/) which can be installed with `npm i -D parcel` if you plan on writing typescript. Alternatively you could use [webpack](https://webpack.js.org/) but it requires considerably more setup.

Create index.html with:
```html
<!DOCTYPE html>
<body>
  <script src="index.ts"></script>
</body>
</html>
```
and index.ts with:
```ts
import { OutputTerminal } from 'terminaltxt';
const output = new OutputTerminal();
output.write('minimal example');
```
Then you can run `parcel serve index.html` and your project will be at [http://localhost:1234](http://localhost:1234).

## Examples

Examples are hosted through github pages and you can view live examples by using the links below.

If you'd like to experiment with the examples then it's recommended that you clone the individual repositories. Then change into the root directory of the example and run `npm i` then you can run `npm start` and the example will be available through a local server at [http://localhost:1234](http://localhost:1234). You can change the code within the src directory and the changes will automatically reload.

List of Examples:

- Minimal Project - [Repository](https://github.com/figraham/terminaltxt-minimal) - [See, Using the Minimal Example](https://github.com/figraham/terminaltxt-source#using-the-minimal-example)
- Hello World - [Repository](https://github.com/figraham/terminaltxt-helloworld) - [Live Example](https://figraham.github.io/terminaltxt-helloworld/)

## Projects

Below are some projects that use TerminalTXT. Please feel free to add you own projects to this list by submitting a pull request with your changes to this `README.md` file.

- 10PRINT - [Repository](https://github.com/figraham/terminaltxt-10print) - [Live Example](http://10print.createdby.fi)
- Caterpillar AKA clone of Snake - [Repository](https://github.com/figraham/caterpillar) - [Live Example](http://caterpillar.createdby.fi)
- Unicode Print - [Repository](https://github.com/figraham/unicode-print) - [Live Example](http://unicodeprint.createdby.fi)
- Tron - [Repository](https://github.com/figraham/tron) - [Live Example](http://tron.createdby.fi)

## Documentation

Documentation is generated with [typedoc](https://typedoc.org/) and is available at [terminaltxt.createdby.fi](http://terminaltxt.createdby.fi).

**Note that documentation isn't always in sync with the npm package.** Please refer to release notes and be mindful of the version that you are using. I'm working to include versioning in documentation.
