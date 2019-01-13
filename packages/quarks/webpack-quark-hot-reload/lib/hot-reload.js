"use strict";

const { ensureConfig, safeMerge } = require("@thc/webpack-chemistry");
const webpack = require("webpack");

module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const defaultConf = {
        hot: true,
        serverConfig: {}
    };

    const defaultServerConf = {
        __DEV_SERVER_PROTOCOL__: "http",
        __DEV_SERVER_HOST__: "localhost",
        __DEV_SERVER_PORT__: 3000,
        __DEV_SERVER_SUBDOMAIN__: ""
    };

    const mergedConf = safeMerge(defaultConf, blockConfig);
    mergedConf.serverConfig = safeMerge(defaultServerConf, mergedConf.serverConfig);
    // If someone use custom config, we need to avoid stringify
    // Or maybe stringify for them ? to see (integer needs to remain integer, so cannot stringify the whole object)
    if (mergedConf.serverConfig.__DEV_SERVER_PROTOCOL__ !== undefined) {
        mergedConf.serverConfig.__DEV_SERVER_PROTOCOL__ = JSON.stringify(
            mergedConf.serverConfig.__DEV_SERVER_PROTOCOL__
        );
    }

    if (mergedConf.serverConfig.__DEV_SERVER_HOST__ !== undefined) {
        mergedConf.serverConfig.__DEV_SERVER_HOST__ = JSON.stringify(mergedConf.serverConfig.__DEV_SERVER_HOST__);
    }

    if (mergedConf.serverConfig.__DEV_SERVER_SUBDOMAIN__ !== undefined) {
        mergedConf.serverConfig.__DEV_SERVER_SUBDOMAIN__ = JSON.stringify(
            mergedConf.serverConfig.__DEV_SERVER_SUBDOMAIN__
        );
    }

    const config = ensureConfig(argConfig);

    if (mergedConf.hot) {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    config.plugins.push(new webpack.DefinePlugin(mergedConf.serverConfig));

    return config;
};
