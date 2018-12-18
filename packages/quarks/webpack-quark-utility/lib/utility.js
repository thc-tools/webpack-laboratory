const { ensureConfig, safeMerge } = require("@thc/webpack-chemistry");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");

module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const defaultConf = {
        caseSensitivePaths: true,
        cleanup: ["js", "misc", "chunks", "img", "fonts", "css", "html"],
        cleanupPath: path.resolve(process.cwd(), "./dist"),
        analyze: false
    };

    const mergedConf = safeMerge(defaultConf, blockConfig);
    const config = ensureConfig(argConfig);

    if (mergedConf.caseSensitivePaths) {
        config.plugins.push(new CaseSensitivePathsPlugin());
    }

    if (mergedConf.cleanup) {
        config.plugins.push(
            new CleanWebpackPlugin(mergedConf.cleanup, {
                allowExternal: true,
                root: mergedConf.cleanupPath
            })
        );
    }

    if (mergedConf.analyze) {
        config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
};
