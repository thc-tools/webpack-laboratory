"use strict";

const { ensureConfig, safeMerge } = require("@thc/webpack-chemistry");

module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const defaultConf = {
        entries: {}
    };
    const mergedConf = safeMerge(defaultConf, blockConfig);
    const config = ensureConfig(argConfig);

    if (mergedConf.polyfill) {
        config.entry.polyfill = mergedConf.polyfill;
    }

    const enhance = mergedConf.enhance ? mergedConf.enhance : elt => elt;

    for (let key in mergedConf.entries) {
        config.entry[key] = enhance(mergedConf.entries[key]);
    }

    return config;
};
