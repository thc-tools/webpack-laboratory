const { ensureConfig, safeMerge } = require("../utils");

module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const defaultConf = {
        handleDefault: true,
        defaultsExclude: [/\.ejs$/, /\.(js|jsx)$/, /\.css$/, /\.json$/],
        miscName: "misc/[name]_[sha512:hash:base64:7].[ext]",
        assets: [
            {
                test: /\.(ttf|eot|woff|woff2|svg)(\?.*)?$/,
                limit: 10000,
                name: "fonts/[name]_[sha512:hash:base64:7].[ext]"
            },
            {
                test: /\.(png|jpg|jpeg|gif)(\?.*)?$/,
                limit: 10000,
                name: "img/[name]_[sha512:hash:base64:7].[ext]"
            }
        ]
    };
    const mergedConf = safeMerge(defaultConf, blockConfig);
    const config = ensureConfig(argConfig);

    const exclude = [];

    mergedConf.assets.forEach(elt => {
        config.module.rules.push({
            test: elt.test,
            loader: "url-loader",
            options: {
                limit: elt.limit,
                name: elt.name
            }
        });
        exclude.push(elt.test);
    });

    if (mergedConf.handleDefault) {
        exclude.push(...mergedConf.defaultsExclude);
        config.module.rules.push({
            loader: "file-loader",
            exclude,
            options: {
                name: mergedConf.miscName
            }
        });
    }

    return config;
};
