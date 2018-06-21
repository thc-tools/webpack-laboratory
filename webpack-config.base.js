const config = {
    output: {
        //path
        //publicPAth
        chunkFilename: 'chunks/[name]_[hash].js',
        filename: '[name].[hash].bundle.js'
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

module.exports = (env, argv) => {

    let nodeEnv = process.env.NODE_ENV;
    if (nodeEnv !== 'development' && nodeEnv !== 'production') {
        throw new Error(
            'Using `@thc/babel-preset-react` requires that you specify `NODE_ENV` or ' +
            '`BABEL_ENV` environment variables. Valid values are "development" and "production". Instead, received: ' +
            JSON.stringify(env) +
            '.'
        );
    }

    config.mode = nodeEnv;
    config.devtool = nodeEnv === 'development' ? 'cheap-eval-source-map' : 'none';

    return config;
};