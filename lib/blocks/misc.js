module.exports = blockConfig => (processEnv, argv) => config => {
    const defaultConf = {
        ignored: /node_modules/,
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
        extensions: [".js", ".jsx"]
    };

    const mergedConf = { ...defaultConf, ...blockConfig };
    config.watchOptions.ignored = mergedConf.ignored;
    config.stats = mergedConf.stats;
    mergedConf.resolve.extensions.push(...mergedConf.extensions);

    return config;
};
