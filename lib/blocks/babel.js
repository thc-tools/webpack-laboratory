const { ensureConfig } = require("../utils");
const { ensureConfig } = require("../utils");

module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const isDev = processEnv.NODE_ENV === "development";
    const isHotReload = processEnv.HOT_RELOAD === "true";

    const defaultConf = {
        useCache: isDev,
        development: isDev,
        hot: isHotReload,
        test: /\.(js|jsx)$/,
        exclude: /node_modules/
    };

    const mergedConf = { ...defaultConf, ...(blockConfig || {}) };
    const config = ensureConfig(argConfig);

    config.module.rules.push({
        test: mergedConf.test,
        exclude: mergedConf.exclude,
        use: [
            {
                loader: "thread-loader"
            },
            mergedConf.useCache && {
                loader: "cache-loader"
            },
            {
                loader: "babel-loader",
                options: {
                    cacheDirectory: false,
                    presets: [
                        [
                            "@thc/babel-preset-react",
                            {
                                development: mergedConf.development,
                                hot: mergedConf.hot
                            }
                        ]
                    ],
                    babelrc: false
                }
            }
        ].filter(Boolean)
    });

    return config;
};
