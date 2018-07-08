module.exports = blockConfig => (processEnv, argv) => config => {
    const defaultConf = {
        template: "template.ejs",
        templateParameters: {
            title: env.npm_package_name
        }
    };

    const mergedConf = { ...defaultConf, ...blockConfig };

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
