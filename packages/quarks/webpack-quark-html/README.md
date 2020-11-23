# `@thc/webpack-quark-html`

This quarks intends to handle the booting of you application.
It will by default generate an `index.html` file with reference to all main outputs and chunks generated at build time.

When installing this module, a `template.ejs` will be added to your project.
It is the template that will be use to generate the `index.html` file.

## Usage

Just install it : `npm i --save-dev --save-exact @thc/webpack-chemistry @thc/webpack-quark-html`

Example in `webpack.config.js` :

```js
"use strict";

const withHtml = require("@thc/webpack-quark-html");
const { envDefaults, createConfigurator } = require("@thc/webpack-chemistry");

module.exports = (processEnv, argv) => {
    const env = envDefaults(processEnv);

    const configurator = createConfigurator(env, argv, withHtml());

    return configurator();
};
```

## Options

| property           | type   | required | default        | description                                      |
| ------------------ | ------ | -------- | -------------- | ------------------------------------------------ |
| template           | string |          | `template.ejs` | the template path (from `webpack.config.js` dir) |
| templateParameters | object |          |                | an object with parameters for the template       |

## References

-   See [`html plugin`](https://webpack.js.org/plugins/html-webpack-plugin//)

## Rules

-   Commit must follow [Conventional Commit convention](https://conventionalcommits.org/)
-   [Pre-commit package](https://www.npmjs.com/package/pre-commit) should be use to enforce linting, tests validations, ...
