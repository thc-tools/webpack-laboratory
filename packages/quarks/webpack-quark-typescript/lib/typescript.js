"use strict";

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { cpus } = require("os");
const { ensureConfig, safeMerge, createConfigurator } = require("@thc/webpack-chemistry");
const handleTs = require("@thc/webpack-quark-babel");

module.exports = (blockConfig) => (processEnv, argv) => (argConfig) => {
    const defaultConf = {
        asyncChecking: true,
        test: /\.ts$/,
        extensions: [".ts"],
        additionalLoaders: [
            {
                loader: "ts-loader",
                options: {
                    transpileOnly: true, // Leave type checking to plugin
                },
            },
        ],
    };

    const mergedConf = safeMerge(defaultConf, blockConfig);
    if (!mergedConf.nbWorkers) {
        mergedConf.nbWorkers = Math.max(cpus().length - (mergedConf.asyncChecking ? 1 : 0), 1);
    }
    const config = ensureConfig(argConfig);

    config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: "**/*.{ts,tsx,js,jsx}",
            },
            async: mergedConf.asyncChecking,
        })
    );

    const configurator = createConfigurator(processEnv, argv, handleTs(mergedConf));

    return configurator(config);
};
