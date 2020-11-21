"use strict";

const { ensureConfig, safeMerge } = require("@thc/webpack-chemistry");
const webpack = require("webpack");

module.exports = (blockConfig) => (processEnv, argv) => (argConfig) => {
    const defaultConf = {
        hot: true,
        serverConfig: {},
    };

    const defaultServerConf = {
        DEV_SERVER_HOST: "localhost",
        DEV_SERVER_PORT: 3000,
    };

    const mergedConf = safeMerge(defaultConf, blockConfig);
    mergedConf.serverConfig = safeMerge(defaultServerConf, mergedConf.serverConfig);
    // If someone use custom config, we need to avoid stringify
    // Or maybe stringify for them ? to see (integer needs to remain integer, so cannot stringify the whole object)

    if (mergedConf.serverConfig.DEV_SERVER_HOST !== undefined) {
        mergedConf.serverConfig.DEV_SERVER_HOST = JSON.stringify(mergedConf.serverConfig.DEV_SERVER_HOST);
    }

    const defineConfig = {
        "process.platform": '"Unknown"',
        "process.env": {
            WDS_SOCKET_HOST: mergedConf.serverConfig.DEV_SERVER_HOST,
            WDS_SOCKET_PORT: +mergedConf.serverConfig.DEV_SERVER_PORT,
            FAST_REFRESH: false,
        },
    };

    const config = ensureConfig(argConfig);

    if (mergedConf.hot) {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    config.plugins.push(new webpack.DefinePlugin(defineConfig));

    return config;
};
