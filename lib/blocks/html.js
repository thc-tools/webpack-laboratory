const { ensureConfig } = require("../utils");
const { ensureConfig } = require("../utils");

module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const defaultConf = {
        template: "template.ejs",
        templateParameters: {
            title: env.npm_package_name
        }
    };

    const mergedConf = { ...defaultConf, ...(blockConfig || {}) };
    const config = ensureConfig(argConfig);

    config.plugins.push(
        new HtmlWebpackPlugin({
            inject: "head",
            template: mergedConf.template,
            templateParameters: {
                title: mergedConf.templateParameters
            }
        })
    );
    return config;
};
