const { ensureConfig } = require("../utils");

module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const defaultConf = {
        caseSensitivePaths: true,
        cleanup: ["js", "misc", "chunks", "img", "fonts", "css", "html"],
        cleanupPath: processEnv.OUTPUT_DIR,
        analyze: processEnv.ANALYZE === "true"
    };

    const mergedConf = { ...defaultConf, ...(blockConfig || {}) };
    const config = ensureConfig(argConfig);

    if (mergedConf.caseSensitivePaths) {
        config.plugins.push(new CaseSensitivePathsPlugin());
    }

    if (mergedConf.cleanup) {
        config.plugins.push(
            new CleanWebpackPlugin(mergedConf.cleanup, {
                allowExternal: true,
                root: mergedConf.cleanupPath
            })
        );
    }

    if (mergedConf.analyze) {
        config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
};
