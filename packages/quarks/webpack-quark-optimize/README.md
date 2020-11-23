# `@thc/webpack-quark-optimize`

This quarks intends to handle tranformation to the output that are used for production.

## Usage

Just install it : `npm i --save-dev --save-exact @thc/webpack-chemistry @thc/webpack-quark-optimize`

Example in `webpack.config.js` :

```js
"use strict";

const withOptimization = require("@thc/webpack-quark-optimize");
const { envDefaults, createConfigurator } = require("@thc/webpack-chemistry");

module.exports = (processEnv, argv) => {
    const env = envDefaults(processEnv);

    const configurator = createConfigurator(env, argv, withOptimization());

    return configurator();
};
```

## Options

| property      | type   | required | default       | description                                  |
| ------------- | ------ | -------- | ------------- | -------------------------------------------- |
| minimize      | string |          | `false`       | if output code should be minified            |
| mode          |        |          | `development` | the mode used by webpack                     |
| bail          |        |          | `false`       | force webpack to stop on error               |
| splitChunks   |        |          | `all`         | option for splint chunk plugin, see below    |
| terserOptions |        |          | `{}`          | option for minification if enable, see below |

## References

-   See [`split chunk plugin`](https://webpack.js.org/plugins/split-chunks-plugin/)
-   See [`terser js plugin`](https://webpack.js.org/plugins/terser-webpack-plugin/)

## Rules

-   Commit must follow [Conventional Commit convention](https://conventionalcommits.org/)
-   [Pre-commit package](https://www.npmjs.com/package/pre-commit) should be use to enforce linting, tests validations, ...
