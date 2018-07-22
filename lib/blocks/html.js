const { ensureConfig, safeMerge } = require("../utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const defaultConf = {
        template: "template.ejs",
        templateParameters: {
            title: processEnv.npm_package_name
        }
    };

    const mergedConf = safeMerge(defaultConf, blockConfig);
    const config = ensureConfig(argConfig);

    config.plugins.push(
        new HtmlWebpackPlugin({
            inject: "head",
            template: mergedConf.template,
            templateParameters: mergedConf.templateParameters
        })
    );
    return config;
};
