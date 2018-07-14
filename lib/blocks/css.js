const { ensureConfig } = require("../utils");
const { ensureConfig } = require("../utils");

module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const defaultConf = {
        extractCss: processEnv.HOT_RELOAD !== "true",
        filename: `css/[name]_${processEnv.npm_package_version}.bundle.css`,
        chunkFilename: "css/[name]_[hash].css"
    };

    const mergedConf = { ...defaultConf, ...(blockConfig || {}) };
    const config = ensureConfig(argConfig);

    config.module.rules.push({
        test: /\.css/,
        use: [
            {
                loader: mergedConf.extractCss ? MiniCssExtractPlugin.loader : "style-loader"
            },
            {
                loader: "css-loader",
                options: {
                    minimize: false,
                    importLoaders: 1
                }
            },
            {
                loader: "postcss-loader",
                options: {
                    // Other options should go into postcss.config.js
                    config: {
                        path: path.join(process.cwd(), "postcss.config.js")
                    }
                }
            }
        ]
    });

    if (mergedConf.extractCss) {
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: mergedConf.filename,
                chunkFilename: mergedConf.chunkFilename
            })
        );
    }

    return config;
};
