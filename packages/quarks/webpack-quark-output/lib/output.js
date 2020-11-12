"use strict";

const { ensureConfig, safeMerge } = require("@thc/webpack-chemistry");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const path = require("path");

module.exports = (blockConfig) => (processEnv, argv) => (argConfig) => {
    const defaultConf = {
        filename: `js/[name]_${processEnv.npm_package_version}.bundle.js`,
        chunkFilename: "chunks/[name]_[hash].js",
        path: path.resolve(process.cwd(), "./dist"),
        publicPath: "/",
        cleanup: ["js", "misc", "chunks", "img", "fonts", "css", "html"],
    };

    const mergedConf = safeMerge(defaultConf, blockConfig);
    const config = ensureConfig(argConfig);

    config.output.filename = mergedConf.filename;
    config.output.path = mergedConf.path;
    config.output.publicPath = mergedConf.publicPath;
    config.output.chunkFilename = mergedConf.chunkFilename;

    if (mergedConf.cleanup) {
        config.plugins.push(
            new CleanWebpackPlugin({
                verbose: true,
                dry: false,
                cleanStaleWebpackAssets: true,
                protectWebpackAssets: false,
                cleanOnceBeforeBuildPatterns: mergedConf.cleanup,
                dangerouslyAllowCleanPatternsOutsideProject: true,
            })
        );
    }

    return config;
};
