const { ensureConfig, safeMerge, deduplicate } = require("../utils");

module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const isDev = processEnv.NODE_ENV === "development";
    const isHotReload = processEnv.HOT_RELOAD === "true";

    const defaultConf = {
        useCache: isDev,
        mode: processEnv.NODE_ENV,
        hot: isHotReload,
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        extensions: [".js", ".jsx"]
    };

    const mergedConf = safeMerge(defaultConf, blockConfig);
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
                                mode: mergedConf.mode,
                                hot: mergedConf.hot
                            }
                        ]
                    ],
                    babelrc: false
                }
            }
        ].filter(Boolean)
    });

    config.resolve.extensions = deduplicate(config.resolve.extensions, mergedConf.extensions);

    return config;
};
