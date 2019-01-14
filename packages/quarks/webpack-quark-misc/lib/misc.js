"use strict";

const { ensureConfig, safeMerge } = require("@thc/webpack-chemistry");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const defaultConf = {
        ignored: /node_modules/,
        stats: {
            colors: true,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: true,
            errorDetails: true,
            warnings: true
        },
        caseSensitivePaths: true,
        analyze: false
    };

    const mergedConf = safeMerge(defaultConf, blockConfig);
    const config = ensureConfig(argConfig);

    config.watchOptions.ignored = mergedConf.ignored;
    config.stats = mergedConf.stats;

    if (mergedConf.caseSensitivePaths) {
        config.plugins.push(new CaseSensitivePathsPlugin());
    }

    if (mergedConf.analyze) {
        config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
};
