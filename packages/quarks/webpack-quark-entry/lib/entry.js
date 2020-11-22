"use strict";

const { ensureConfig, safeMerge } = require("@thc/webpack-chemistry");

module.exports = (blockConfig) => (processEnv, argv) => (argConfig) => {
    const defaultConf = {
        entries: {},
    };
    const mergedConf = safeMerge(defaultConf, blockConfig);
    const config = ensureConfig(argConfig);

    const enhance = mergedConf.enhance ? mergedConf.enhance : (elt) => elt;

    for (let key in mergedConf.entries) {
        config.entry[key] = enhance((config.entry.polyfill || []).concat(mergedConf.entries[key]));
    }

    return config;
};
