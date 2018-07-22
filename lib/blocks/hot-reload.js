const { ensureConfig, safeMerge } = require("../utils");
const webpack = require("webpack");

module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const isHotReload = processEnv.HOT_RELOAD === "true";

    const defaultConf = {
        hot: isHotReload,
        protocol: JSON.stringify(processEnv.DEV_SERVER_PROTOCOL),
        host: JSON.stringify(processEnv.DEV_SERVER_HOST),
        port: JSON.stringify(processEnv.DEV_SERVER_PORT),
        subdomain: JSON.stringify(processEnv.DEV_SERVER_SUBDOMAIN)
    };

    const mergedConf = safeMerge(defaultConf, blockConfig);
    const config = ensureConfig(argConfig);

    if (mergedConf.hot) {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        config.plugins.push(
            new webpack.DefinePlugin({
                __DEV_SERVER_PROTOCOL__: mergedConf.protocol,
                __DEV_SERVER_HOST__: mergedConf.host,
                __DEV_SERVER_PORT__: mergedConf.port,
                __DEV_SERVER_SUBDOMAIN__: mergedConf.subdomain
            })
        );
    }

    return config;
};
