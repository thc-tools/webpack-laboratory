"use strict";

const path = require("path");
const webpack = require("webpack");

const { ensureConfig, safeMerge } = require("@thc/webpack-chemistry");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { WebpackPluginServe: Serve } = require("webpack-plugin-serve");

module.exports = (blockConfig) => (processEnv, argv) => (argConfig) => {
    const defaultConf = {
        hot: true,
        host: "localhost",
        port: 300,
        ramdisk: false,
        static: "./dist",
    };

    const mergedConf = safeMerge(defaultConf, blockConfig);
    const config = ensureConfig(argConfig);

    if (mergedConf.hot) {
        config.resolve.alias["react-dom"] = "@hot-loader/react-dom";
        const serveOptions = {
            hmr: "refresh-on-failure",
            open: true,
            host: mergedConf.host,
            port: mergedConf.post,
            ramdisk: mergedConf.ramdisk,
            static: path.resolve(process.cwd(), mergedConf.static),
            status: true,
            client: {
                retry: true,
            },
            historyFallback: true,
        };

        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        config.plugins.push(
            new ReactRefreshWebpackPlugin({
                overlay: {
                    sockIntegration: "wps",
                },
            })
        );
        config.plugins.push(new Serve(serveOptions));
    }

    return config;
};
