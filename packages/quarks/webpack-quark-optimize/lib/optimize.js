const { ensureConfig, safeMerge } = require("@thc/webpack-chemistry");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const defaultConf = {
        minimize: false,
        mode: "development",
        bail: false,
        splitChunks: "all",
        uglifyOptions: {}
    };

    const defaultUglifyConf = {
        // TODO rework, to have both plugin options AND uglify options
        /*parallel: true, 
        extractComments: true,*/
        compress: {
            drop_console: true,
            // ecma: 6,
            passes: 2
        }
    };
    const mergedConf = safeMerge(defaultConf, blockConfig);
    mergedConf.uglifyOptions = safeMerge(defaultUglifyConf, blockConfig.uglifyOptions);

    const config = ensureConfig(argConfig);

    config.optimization.minimize = mergedConf.minimize;
    config.mode = mergedConf.mode;
    config.bail = mergedConf.bail;
    config.optimization.splitChunks.chunks = mergedConf.splitChunks;
    config.optimization.minimizer.push(
        new UglifyJsPlugin({
            uglifyOptions: mergedConf.uglifyOptions
        })
    );

    return config;
};
