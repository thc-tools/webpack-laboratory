# `@thc/webpack-quark-entry`

This quark intends to handle the entry feature of webpack.
It exposes special care for polyfill and entry enhancing capabilities.

## Usage

Just install it : `npm i --save-dev --save-exact @thc/webpack-chemistry @thc/webpack-quark-entry`

Example in `webpack.config.js` :

```js
"use strict";

const withEntry = require("@thc/webpack-quark-entry");
const { envDefaults, createConfigurator } = require("@thc/webpack-chemistry");

module.exports = (processEnv, argv) => {
    const env = envDefaults(processEnv);

    const configurator = createConfigurator(
        env,
        argv,
        withEntry({
            entries: { main: "./src/app.js" }
        })
    );

    return configurator();
};
```

## Options

| property | type                 | required | default | description                                                         |
| -------- | -------------------- | -------- | ------- | ------------------------------------------------------------------- |
| entries  | object               | x        |         | A key/value object containing entries point                         |
| polyfill | string[]             |          |         | A special entry point for polyfills                                 |
| enhance  | (string) => string[] |          |         | An enhancer function to complete entries, eg: usefull for hotreload |

## References

-   See [`webpack entry`](https://webpack.js.org/concepts/#entry)

## Rules

-   Commit must follow [Conventional Commit convention](https://conventionalcommits.org/)
-   [Pre-commit package](https://www.npmjs.com/package/pre-commit) should be use to enforce linting, tests validations, ...
