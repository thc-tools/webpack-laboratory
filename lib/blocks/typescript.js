const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { cpus } = require("os");

const { ensureConfig, safeMerge, deduplicate } = require("../utils");

module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const isDev = processEnv.NODE_ENV === "development";
    const isHotReload = processEnv.HOT_RELOAD === "true";

    const defaultConf = {
        useCache: isDev,
        mode: processEnv.NODE_ENV,
        hot: isHotReload,
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        extensions: [".ts", ".tsx"]
    };

    const mergedConf = safeMerge(defaultConf, blockConfig);
    const config = ensureConfig(argConfig);

    config.module.rules.push({
        test: mergedConf.test,
        exclude: mergedConf.exclude,
        use: [
            {
                loader: "thread-loader",
                options: {
                    // Let's leave 1 cpu free, for async type checking
                    workers: Math.max(cpus().length - (mergedConf.hot ? 1 : 0), 1)
                }
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
            },
            {
                loader: "ts-loader",
                options: {
                    transpileOnly: true // Leave type checking to plugin
                }
            }
        ].filter(Boolean)
    });

    config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
            tslint: true,
            async: mergedConf.hot
        })
    );

    config.resolve.extensions = deduplicate(config.resolve.extensions, mergedConf.extensions);

    return config;
};
