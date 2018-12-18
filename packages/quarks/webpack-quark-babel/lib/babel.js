"use strict";
const { ensureConfig, deduplicate, safeMerge } = require("@thc/webpack-chemistry");
const { cpus } = require("os");

module.exports = blockConfig => (processEnv, argv) => argConfig => {

    const defaultBabelOptions = {
        babelrc: true
    };

    const defaultJsConfig = {
        useCache: true,
        test: /\.js$/,
        exclude: /node_modules/,
        extensions: [".js"],
        babelOptions: {},
        nbWorkers: cpus().length
    };

    const mergedBlockConf = safeMerge(defaultJsConfig, blockConfig);
    mergedBlockConf.babelOptions = safeMerge(defaultBabelOptions, mergedBlockConf.babelOptions);
    mergedBlockConf.additionalLoaders = mergedBlockConf.additionalLoaders ? mergedBlockConf.additionalLoaders : [];

    const config = ensureConfig(argConfig);

    config.module.rules.push({
        test: mergedBlockConf.test,
        exclude: mergedBlockConf.exclude,
        use: [
            mergedBlockConf.nbWorkers && mergedBlockConf.nbWorkers > 1 && {
                loader: "thread-loader",
                workers: mergedBlockConf.nbWorkers,
            },
            mergedBlockConf.useCache && {
                loader: "cache-loader"
            },
            {
                loader: "babel-loader",
                options: {
                    cacheDirectory: false,
                    ...mergedBlockConf.babelOptions
                }
            },
            ...mergedBlockConf.additionalLoaders
        ]
            .filter(Boolean)
    });

    config.resolve.extensions = deduplicate(config.resolve.extensions, mergedBlockConf.extensions);

    return config;
};
