const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const glob = require("glob");

const { ensureConfig, safeMerge } = require("../utils");

module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const defaultConf = {
        extractCss: processEnv.HOT_RELOAD !== "true",
        filename: `css/[name]_${processEnv.npm_package_version}.bundle.css`,
        chunkFilename: "css/[name]_[hash].css",
        test: /\.(css|scss)/
    };

    const mergedConf = safeMerge(defaultConf, blockConfig);
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
                    importLoaders: 2
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
            },
            {
                loader: "sass-loader",
                options: {
                    includePaths: glob.sync("node_modules").map(d => path.join(process.cwd(), d))
                    // sourceMap: env.SOURCE_MAPS
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
