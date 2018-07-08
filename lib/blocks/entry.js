const { prepareEntries } = require("../utils");

module.exports = blockConfig => (processEnv, argv) => config => {
    const isHotReload = processEnv.HOT_RELOAD === "true";

    const defaultConf = {
        polyfill: ["@babel/polyfill", /*Needed for Opera Mini*/ "whatwg-fetch"],
        hot: isHotReload,
        entries: {
            main: "./src/app.js"
        }
    };

    const mergedConf = { ...defaultConf, ...blockConfig };

    if (mergedConf.polyfill) {
        config.entry.polyfill = mergedConf.polyfill;
    }

    const identity = mergedConf.hot ? prepareEntries : elt => elt;

    for (let key in mergedConf.entries) {
        config.entry[key] = identity(mergedConf.entries[key]);
    }

    return config;
};
