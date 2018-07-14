const { ensureConfig } = require("../utils");

module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const isDev = processEnv.NODE_ENV === "development";

    const defaultConf = {
        devtool: isDev ? "cheap-eval-source-map" : "none",
        test: /\.(js|jsx)$/
    };
    const mergedConf = { ...defaultConf, ...(blockConfig || {}) };
    const config = ensureConfig(argConfig);

    config.devtool = mergedConf.devtool;
    if (config.devtool !== "none") {
        config.modules.rules.push({
            test: mergedConf.test,
            enforce: "pre",
            exclude: /node_modules\\css-loader/,
            loader: "source-map-loader"
        });
    }

    return config;
};
