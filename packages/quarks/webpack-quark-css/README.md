# `@thc/webpack-quark-css`

This quarks intends to handle your applicaiton style sheets.
It will use `css-loader` in addition to `postcss-loader` to load your resources.
Both loaders configuration can be easily extended with additionnal options or using a `postcss.config.js` file.
In addition if you set the `extractCss` option to `true` it will extract the css in an external file using `mini-css-extract-plugin`, otherwise `style-loader` adds it to your main output file (usually js).

## Usage

Just install it : `npm i --save-dev --save-exact @thc/webpack-chemistry @thc/webpack-quark-css`

Example in `webpack.config.js` :

```js
"use strict";

const withCss = require("@thc/webpack-quark-css");
const { envDefaults, createConfigurator } = require("@thc/webpack-chemistry");

module.exports = (processEnv, argv) => {
    const env = envDefaults(processEnv);

    const configurator = createConfigurator(env, argv, withCss());

    return configurator();
};
```

## Options

| property          | type     | required | default                                                   | description                                                                                                                                  |
| ----------------- | -------- | -------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| test              | string   |          | `/\.css$/`                                                | glob to test extension                                                                                                                       |
| extractCss        | boolean  |          | `false`                                                   | if should extract css in separate file, should be true for production build                                                                  |
| filename          | string   |          | `css/[name]_${processEnv.npm_package_version}.bundle.css` | pattern to generate output filename                                                                                                          |
| chunkFilename     | string[] |          | `css/[name]_[hash].css`                                   | pattern to generate chunk filename                                                                                                           |
| postcssConfig     | object   |          |                                                           | additionnal configuration for `postcss`                                                                                                      |
| cssConfig         | object   |          |                                                           | additionnal configuration for `css-loader`                                                                                                   |
| additionalLoaders | object   |          |                                                           | additionanl loader, see [@thc/webpack-quark-scss](https://github.com/thc-tools/webpack-laboratory/tree/master/packages/quarks/webpack-quark-scss) |

## References

-   See [`style-loader`](https://github.com/webpack-contrib/style-loader)
-   See [`css-loader`](https://github.com/webpack-contrib/css-loader)
-   See [`postcss-loader`](https://github.com/postcss/postcss-loader)
-   See [`mini-css-extract-plugin`](https://github.com/webpack-contrib/mini-css-extract-plugin)

## Rules

-   Commit must follow [Conventional Commit convention](https://conventionalcommits.org/)
-   [Pre-commit package](https://www.npmjs.com/package/pre-commit) should be use to enforce linting, tests validations, ...
