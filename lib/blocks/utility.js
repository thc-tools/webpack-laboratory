module.exports = blockConfig => (processEnv, argv) => config => {
    const defaultConf = {
        caseSensitivePaths: true,
        cleanup: ["js", "misc", "chunks", "img", "fonts", "css", "html"],
        analyze: processEnv.ANALYZE === "true"
    };

    const mergedConf = { ...defaultConf, ...(blockConfig || {}) };

    if (mergedConf.caseSensitivePaths) {
        config.plugins.push(new CaseSensitivePathsPlugin());
    }

    if (mergedConf.cleanup) {
        config.plugins.push(
            new CleanWebpackPlugin(mergedConf.cleanup, {
                allowExternal: true,
                root: config.output.path
            })
        );
    }

    if (mergedConf.analyze) {
        config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
};
