const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const envDefaults = require('./env-defaults');

const config = {
    output: {
        chunkFilename: 'chunks/[name]_[hash].js'
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
        extensions: ['js', 'jsx'],
    },
    optimization: {
        minimize: false //Babel is gonna do the minification
    },
    plugins: [
        new CaseSensitivePathsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                exclude: /node_modules\\css-loader/,
                loader: 'source-map-loader'
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
                    /\.(js|jsx)$/,
                    /\.css$/,
                    /\.json$/,
                    /\.(ttf|eot|woff|woff2|svg)(\?.*)?$/,
                    /\.(png|jpg|jpeg|gif)(\?.*)?$/
                ],
                loader: 'file-loader',
                options: {
                    name: 'misc/[name]_[sha512:hash:base64:7].[ext]'
                }
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'thread-loader'
                    },
                    {
                        loader: 'cache-loader'
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: false,
                            presets: ['@thc/babel-preset-react'],
                            //exclude: /node_modules/
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name]_[sha512:hash:base64:7].[ext]'
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name]_[sha512:hash:base64:7].[ext]'
                }
            }
        ]
    }
};

module.exports = (processEnv, argv) => {
    const env = envDefaults(processEnv);
    const nodeEnv = env.NODE_ENV;

    config.mode = nodeEnv;
    config.devtool = nodeEnv === 'development' ? 'cheap-eval-source-map' : 'none';
    config.output.filename = `js/[name]_${env.npm_package_version}.bundle.js`;
    config.output.path = env.OUTPUT_DIR;
    config.output.publicPath = env.OUTPUT_PUBLIC_PATH;

    config.plugins.push(new CleanWebpackPlugin(['js', 'misc', 'chunks', 'img', 'fonts', 'css'], { allowExternal: true, root: config.output.path }));
    config.module.rules.push({
        test: /\.css/,
        use: [
            {
                loader: env.HOT_RELOAD === true ? 'style-loader' : MiniCssExtractPlugin.loader
            },
            {
                loader: 'css-loader',
                options: {
                    minimize: false,
                    importLoaders: 1,
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    // Other options should go into postcss.config.js
                    config: {
                        path: path.join(process.cwd(), 'postcss.config.js')
                    }
                }
            }
        ]
    });

    if (env.HOT_RELOAD === 'true') {
        config.plugins.push(new HtmlWebpackPlugin());
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
    } else {
        config.plugins.push(new MiniCssExtractPlugin({ filename: `css/[name]_${env.npm_package_version}.bundle.js`, chunkFilename: 'css/[name]_[hash].css' }))
    }

    if (env.ANALYZE === 'true') {
        config.plugins.push(new BundleAnalyzerPlugin());
    }
    return config;
};