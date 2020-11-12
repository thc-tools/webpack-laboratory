"use strict";

const { ensureConfig, safeMerge } = require("@thc/webpack-chemistry");

module.exports = (blockConfig) => (processEnv, argv) => (argConfig) => {
    const defaultConf = {
        devtool: "eval-cheap-source-map",
        test: /\.js$/,
    };
    const mergedConf = safeMerge(defaultConf, blockConfig);
    const config = ensureConfig(argConfig);

    config.devtool = mergedConf.devtool === "none" ? false : mergedConf.devtool;
    if (config.devtool !== "none") {
        config.module.rules.push({
            test: mergedConf.test,
            enforce: "pre",
            exclude: /node_modules\\css-loader/,
            loader: "source-map-loader",
        });
    }

    return config;
};
