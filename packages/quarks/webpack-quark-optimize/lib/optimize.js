const { ensureConfig, safeMerge } = require("@thc/webpack-chemistry");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const defaultConf = {
        minimize: false,
        mode: "development",
        bail: false,
        splitChunks: "all",
        terserOptions: {},
        pluginOptions: {}
    };

    const defaultTerserConf = {
        compress: {
            drop_console: true,
            ecma: 6,
            passes: 2
        },
        output: {
            ecma: 6 // Use {a} instead of {a:a}, breaking only IE, see http://kangax.github.io/compat-table/es6/#test-object_literal_extensions_shorthand_properties
        }
    };

    const defaultPluginOptions = {
        parallel: true,
        extractComments: {
            condition: "some",
            filename: "misc/LICENSE"
        }
    };

    const mergedConf = safeMerge(defaultConf, blockConfig);
    mergedConf.terserOptions = safeMerge(defaultTerserConf, blockConfig.terserOptions);
    mergedConf.pluginOptions = safeMerge(defaultPluginOptions, blockConfig.pluginOptions);

    const config = ensureConfig(argConfig);

    config.optimization.minimize = mergedConf.minimize;
    config.mode = mergedConf.mode;
    config.bail = mergedConf.bail;
    config.optimization.splitChunks.chunks = mergedConf.splitChunks;
    config.optimization.minimizer.push(
        new TerserPlugin({
            ...mergedConf.pluginOptions,
            terserOptions: mergedConf.terserOptions
        })
    );

    return config;
};
