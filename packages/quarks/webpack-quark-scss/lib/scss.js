"use strict";

const { ensureConfig, safeMerge, createConfigurator } = require("@thc/webpack-chemistry");
const handleCss = require("@thc/webpack-quark-css");

const path = require("path");
const glob = require("glob");


module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const defaultConf = {
        test: /\.(css|scss)/,
        additionalLoaders: [{
            loader: "sass-loader",
            options: {
                includePaths: glob.sync("node_modules").map(d => path.join(process.cwd(), d))
            }
        }]
    };

    const mergedConf = safeMerge(defaultConf, blockConfig);
    const config = ensureConfig(argConfig);

    const configurator = createConfigurator(
        processEnv,
        argv,
        handleCss(mergedConf));

    return configurator(config);
};
