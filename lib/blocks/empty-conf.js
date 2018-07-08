module.exports = blockConfig => (processEnv, argv) => config => {
    // TODO this should initialized non existing on config, instead of building a new object
    const builtConf = {
        output: {},
        entry: {},
        watchOptions: {},
        optimization: {
            splitChunks: {},
            minimizer: []
        },
        resolve: {
            extensions: []
        },
        module: {
            rules: []
        },
        plugins: []
    };

    return builtConf;
};
