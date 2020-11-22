"use strict";

const { ensureConfig, safeMerge } = require("@thc/webpack-chemistry");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = (blockConfig) => (processEnv, argv) => (argConfig) => {
    const config = ensureConfig(argConfig);

    const defaultCssConfig = {
        test: /\.css$/,
        extractCss: false, //processEnv.HOT_RELOAD !== "true",
        filename: `css/[name]_${processEnv.npm_package_version}.bundle.css`,
        chunkFilename: "css/[name]_[hash].css",
        cssLoaderOptions: {},
    };

    const mergedCssBlockConf = safeMerge(defaultCssConfig, blockConfig);
    mergedCssBlockConf.additionalLoaders = mergedCssBlockConf.additionalLoaders
        ? mergedCssBlockConf.additionalLoaders
        : [];

    const nbLoaders = 1 + mergedCssBlockConf.additionalLoaders.length;

    config.module.rules.push({
        test: mergedCssBlockConf.test,
        use: [
            {
                loader: mergedCssBlockConf.extractCss ? MiniCssExtractPlugin.loader : "style-loader",
            },
            {
                loader: "css-loader",
                options: {
                    importLoaders: nbLoaders,
                    ...mergedCssBlockConf.cssLoaderOptions,
                },
            },
            {
                loader: "postcss-loader",
                options: mergedCssBlockConf.postcssConfig,
            },
            ...mergedCssBlockConf.additionalLoaders,
        ],
    });

    if (mergedCssBlockConf.extractCss) {
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: mergedCssBlockConf.filename,
                chunkFilename: mergedCssBlockConf.chunkFilename,
            })
        );
    }

    return config;
};
