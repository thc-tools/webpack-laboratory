module.exports = blockConfig => (processEnv, argv) => config => {
    const nodeEnv = env.NODE_ENV;
    const isProd = nodeEnv === "production";

    const defaultConf = {
        minimize: isProd,
        mode: nodeEnv,
        bail: isProd,
        splitChunks: "all",
        uglifyOptions: {
            compress: {
                drop_console: true,
                ecma: 6,
                passes: 2
            }
        }
    };

    const mergedConf = { ...defaultConf, ...(blockConfig || {}) };

    config.optimization.minimize = mergedConf.minimize;
    config.mode = mergedConf.mode;
    config.bail = mergedConf.bail;
    config.optimization.splitChunks.chunks = mergedConf.splitChunks;
    config.optimization.minimizer.push(
        new UglifyJsPlugin({
            uglifyOptions
        })
    );

    return config;
};
