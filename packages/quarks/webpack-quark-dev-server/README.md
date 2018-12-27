# `@thc/webpack-quark-dev-server`

This quarks intends to help with using hot reload

## Usage

Just install it : `npm i --save-dev --save-exact @thc/webpack-react @thc/webpack-quark-dev-server`

Example in `webpack.config.js` :

```js
"use strict";

const withHotReload = require("@thc/webpack-quark-dev-server");
const { envDefaults, createConfigurator } = require("@thc/webpack-chemistry");

module.exports = (processEnv, argv) => {
    const env = envDefaults(processEnv);

    const configurator = createConfigurator(env, argv, withHotReload());

    return configurator();
};
```

## Options

| property                                  | type    | required | default     | description                           |
| ----------------------------------------- | ------- | -------- | ----------- | ------------------------------------- |
| hot                                       | boolean |          | `true`      | if hot reload is active               |
| serverConfig.\_\_DEV_SERVER_PROTOCOL\_\_  | string  |          | `http`      | the rotocol to use: `http` or `https` |
| serverConfig.\_\_DEV_SERVER_HOST\_\_      | string  |          | `localhost` | the hostname use                      |
| serverConfig.\_\_DEV_SERVER_PORT\_\_      | string  |          | `3000`      | the port to use                       |
| serverConfig.\_\_DEV_SERVER_SUBDOMAIN\_\_ | string  |          |             | the subdomain to use                  |

## References

-   See [`hot reload`](https://webpack.js.org/concepts/hot-module-replacement/)

## Rules

-   Commit must follow [Conventional Commit convention](https://conventionalcommits.org/)
-   [Pre-commit package](https://www.npmjs.com/package/pre-commit) should be use to enforce linting, tests validations, ...
