module.exports = blockConfig => (processEnv, argv) => config => {
    const isDev = processEnv.NODE_ENV === "development";
    const isHotReload = processEnv.HOT_RELOAD === "true";

    const defaultConf = {
        useCache: isDev,
        development: isDev,
        hot: isHotReload,
        test: /\.(js|jsx)$/
    };

    const mergedConf = { ...defaultConf, ...(blockConfig || {}) };

    config.module.rules.push({
        test: mergedConf.test,
        exclude: /node_modules/,
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
