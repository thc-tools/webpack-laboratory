const defaultsDeep = require("lodash.defaultsdeep");

module.exports = blockConfig => (processEnv, argv) => config => {
    const defaultConf = {
        handleDefault: true,
        excludeEjs: true,
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
    const mergedConf = { ...defaultConf, ...(blockConfig || {}) };

    const excludes = [];

    if (mergedConf.excludeEjs) {
        excludes.push(/\.ejs$/);
    }

    mergedConf.assets.forEach(elt => {
        config.module.rules.push({
            test: elt.test,
            loader: "url-loader",
            options: {
                limit: elt.limit,
                name: elt.name
            }
        });
        excludes.push(elt.test);
    });

    if (mergedConf.handleDefault) {
        config.module.rules.push({
            excludes,
            options: {
                name: mergedConf.miscName
            }
        });
    }

    return config;
};
