# `@thc/webpack-quark-babel`

This quark intends to handle the usage of babel to use better js using `babel-loader`.
It will add some more configuration to handle easily caching with `cache-loader` and multi-threading build using `thread-loader`.
It can be easily extended to handle framework like React (see [Recipes](#recipes))

## Usage

Just install it : `npm i --save-dev --save-exact @thc/webpack-react @thc/webpack-quark-babel`

Example in `webpack.config.js` :

```js
"use strict";

const withJs = require("@thc/webpack-quark-babel");
const { envDefaults, createConfigurator } = require("@thc/webpack-chemistry");

module.exports = (processEnv, argv) => {
    const env = envDefaults(processEnv);

    const configurator = createConfigurator(env, argv, withJs());

    return configurator();
};
```

## Options

| property          | type     | required | default           | description                                                                                                                                                        |
| ----------------- | -------- | -------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| useCache          | boolean  |          | `true`            | if should use cache, caution should be deactivated for build production                                                                                            |
| test              | string   |          | `/\.js\$/`        | file extension that loader should handle                                                                                                                           |
| exclude           | string   |          | `/node_modules/`  | glob that should be ignore by handler                                                                                                                              |
| extensions        | string[] |          | `[".js"]`         | list of extensions handled by loader                                                                                                                               |
| babelOptions      | object   |          | `{babelrc: true}` | options for babel                                                                                                                                                  |
| nbWorkers         | number   |          |                   | number of workers to use                                                                                                                                           |
| additionalLoaders | object[] |          | []                | any additional loader to use, see [@thc/webpack-quark-typescript](https://github.com/thc-tools/webpack-react/tree/master/packages/quarks/webpack-quark-typescript) |

## Recipes

### Usage for react

```js
"use strict";

const withJs = require("@thc/webpack-quark-babel");
const { envDefaults, createConfigurator } = require("@thc/webpack-chemistry");

module.exports = (processEnv, argv) => {
    const env = envDefaults(processEnv);
    const hotReload = env.HOT_RELOAD;

    const configurator = createConfigurator(
        env,
        argv,
        withJs({
            test: /\.jsx?$/,
            extensions: [".js", ".jsx"],
            babelOptions: {
                presets: [
                    [
                        "@thc/babel-preset-react",
                        {
                            mode: env.NODE_ENV,
                            hot: hotReload
                        }
                    ]
                ],
                babelrc: false
            }
        })
    );

    return configurator();
};
```

## References

-   See [`babel-loader`](https://github.com/babel/babel-loader)
-   See [`cache-loader`](https://github.com/webpack-contrib/cache-loader)
-   See [`thread-loader`](https://github.com/webpack-contrib/thread-loader)

## Rules

-   Commit must follow [Conventional Commit convention](https://conventionalcommits.org/)
-   [Pre-commit package](https://www.npmjs.com/package/pre-commit) should be use to enforce linting, tests validations, ...
