module.exports = blockConfig => (processEnv, argv) => config => {
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
