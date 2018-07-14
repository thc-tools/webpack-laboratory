const { ensureConfig } = require("../utils");
const { ensureConfig } = require("../utils");

module.exports = blockConfig => (processEnv, argv) => argConfig => {
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

    const mergedConf = { ...defaultConf, ...(blockConfig || {}) };
    const config = ensureConfig(argConfig);

    config.watchOptions.ignored = mergedConf.ignored;
    config.stats = mergedConf.stats;
    mergedConf.resolve.extensions.push(...mergedConf.extensions);

    return config;
};
