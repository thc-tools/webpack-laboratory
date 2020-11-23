# `@thc/webpack-quark-assets`

This quark intends to handle asset dependencies.

It is based on both `file-loader` and `url-loader`.
All basic files will be put into a `misc/` folder using `file-loader`.
Whereas images and fonts will be inlined if under 1000 bytes or put in respective `img/` and `font/` folders using `url-loader`.

## Usage

Just install it : `npm i --save-dev --save-exact @thc/webpack-chemistry @thc/webpack-quark-assets`

Example in `webpack.config.js` :

```js
"use strict";

const withAssets = require("@thc/webpack-quark-assets");
const { envDefaults, createConfigurator } = require("@thc/webpack-chemistry");

module.exports = (processEnv, argv) => {
    const env = envDefaults(processEnv);

    const configurator = createConfigurator(env, argv, withAssets());

    return configurator();
};
```

## Options

| property        | type     | required | default                                    | description                                              |
| --------------- | -------- | -------- | ------------------------------------------ | -------------------------------------------------------- |
| handleDefault   | boolean  |          | `true`                                     | if should add a default file loader                      |
| defaultsExclude | string[] |          | `[/\.ejs$/, /\.js$/, /\.css$/, /\.json$/]` | list of excluded files extension for default file loader |
| miscName        | string   |          | `misc/[name]_[sha512:hash:base64:7].[ext]` | name for output files                                    |
| assets          | object[] |          | see below, Assert format                   | special care for specific formats using url loader       |

Asset format

| property | type   | required | default | description                             |
| -------- | ------ | -------- | ------- | --------------------------------------- |
| test     | string |          |         | regex like to match files               |
| limit    | number |          | 1000    | number bytes limit for inlining content |
| name     | string |          |         | name for output files                   |

Will by default handle images and fonts like :

```js
assets: [
    {
        test: /\.(ttf|eot|woff|woff2|svg)(\?.*)?$/,
        limit: 10000,
        name: "fonts/[name]_[sha512:hash:base64:7].[ext]"
    },
    {
        test: /\.(png|jpg|jpeg|gif)(\?.*)?$/,
        limit: 10000,
        name: "img/[name]_[sha512:hash:base64:7].[ext]"
    }
];
```

## References

-   See [`file-loader`](https://github.com/webpack-contrib/file-loader)
-   See [`url-loader`](https://github.com/webpack-contrib/url-loader)

## Rules

-   Commit must follow [Conventional Commit convention](https://conventionalcommits.org/)
-   [Pre-commit package](https://www.npmjs.com/package/pre-commit) should be use to enforce linting, tests validations, ...
