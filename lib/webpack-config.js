const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const { envDefaults } = require("./utils");

const config = {
    output: {
        chunkFilename: "chunks/[name]_[hash].js"
    },
    entry: {
        polyfill: ["@babel/polyfill", /*Needed for Opera Mini*/ "whatwg-fetch"]
    },
    watchOptions: {
        ignored: /node_modules/
    },
    stats: {
        colors: true,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: true
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                // extractComments: {
                //     filename: 'misc/${filename}.LICENSE'
                // },
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                        ecma: 6,
                        passes: 2
                    }
                }
            })
        ],
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [new CaseSensitivePathsPlugin()],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: "pre",
                exclude: /node_modules\\css-loader/,
                loader: "source-map-loader"
            },
            /*{
                test: /\.(js|jsx)/,
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    cache: true,
                    emitError: false,
                    emitWarning: false,
                    failOnError: false,
                    failOnWarning: false
                }
            },*/
            {
                exclude: [
                    /\.ejs$/,
                    /\.(js|jsx)$/,
                    /\.css$/,
                    /\.json$/,
                    /\.(ttf|eot|woff|woff2|svg)(\?.*)?$/,
                    /\.(png|jpg|jpeg|gif)(\?.*)?$/
                ],
                loader: "file-loader",
                options: {
                    name: "misc/[name]_[sha512:hash:base64:7].[ext]"
                }
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "fonts/[name]_[sha512:hash:base64:7].[ext]"
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "img/[name]_[sha512:hash:base64:7].[ext]"
                }
            }
        ]
    }
};

module.exports = (processEnv, argv) => {
    const env = envDefaults(processEnv);
    const nodeEnv = env.NODE_ENV;
    const isProd = nodeEnv === "production";
    const isDev = nodeEnv === "development";
    const isHotReload = env.HOT_RELOAD === "true";

    config.mode = nodeEnv;
    config.devtool = isDev ? "cheap-eval-source-map" : "none";
    config.bail = isProd;
    config.output.filename = `js/[name]_${env.npm_package_version}.bundle.js`;
    config.output.path = env.OUTPUT_DIR;
    config.output.publicPath = env.OUTPUT_PUBLIC_PATH;
    config.optimization.minimize = isProd;

    config.plugins.push(
        new CleanWebpackPlugin(["js", "misc", "chunks", "img", "fonts", "css", "html"], {
            allowExternal: true,
            root: config.output.path
        })
    );
    config.module.rules.push({
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: "thread-loader"
            },
            isDev && {
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
                                development: isDev,
                                hot: isHotReload
                            }
                        ]
                    ],
                    babelrc: false
                }
            }
        ].filter(Boolean)
    });

    config.module.rules.push({
        test: /\.css/,
        use: [
            {
                loader: isHotReload ? "style-loader" : MiniCssExtractPlugin.loader
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

    config.plugins.push(
        new HtmlWebpackPlugin({
            inject: "head",
            template: "template.ejs",
            templateParameters: {
                title: env.npm_package_name
            }
        })
    );

    if (isHotReload) {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        config.plugins.push(
            new webpack.DefinePlugin({
                __DEV_SERVER_PROTOCOL__: JSON.stringify(env.DEV_SERVER_PROTOCOL),
                __DEV_SERVER_HOST__: JSON.stringify(env.DEV_SERVER_HOST),
                __DEV_SERVER_PORT__: JSON.stringify(env.DEV_SERVER_PORT),
                __DEV_SERVER_SUBDOMAIN__: JSON.stringify(env.DEV_SERVER_SUBDOMAIN)
            })
        );
    } else {
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: `css/[name]_${env.npm_package_version}.bundle.css`,
                chunkFilename: "css/[name]_[hash].css"
            })
        );
    }

    if (env.ANALYZE === "true") {
        config.plugins.push(new BundleAnalyzerPlugin());
    }
    return config;
};
