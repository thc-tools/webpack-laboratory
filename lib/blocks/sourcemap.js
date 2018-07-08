module.exports = blockConfig => (processEnv, argv) => config => {
    const isDev = processEnv.NODE_ENV === "development";

    const defaultConf = {
        devtool: isDev ? "cheap-eval-source-map" : "none",
        test: /\.(js|jsx)$/
    };
    const mergedConf = { ...defaultConf, ...(blockConfig || {}) };

    config.devtool = mergedConf.devtool;
    if (config.devtool !== "none") {
        config.modules.push({
            test: mergedConf.test,
            enforce: "pre",
            exclude: /node_modules\\css-loader/,
            loader: "source-map-loader"
        });
    }

    return config;
};
