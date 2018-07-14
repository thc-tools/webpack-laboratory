const { ensureConfig } = require("../utils");
const { ensureConfig } = require("../utils");

const enhanceForHotReload = entries => {
    return [
        "@thc/webpack-react/lib/override/react-hot-dev-client",
        "react-error-overlay",
        "webpack/hot/only-dev-server"
    ].concat(entries);
};

module.exports = blockConfig => (processEnv, argv) => argConfig => {
    const isHotReload = processEnv.HOT_RELOAD === "true";

    const defaultConf = {
        polyfill: ["@babel/polyfill", /*Needed for Opera Mini*/ "whatwg-fetch"],
        hot: isHotReload,
        entries: {
            main: "./src/app.js"
        }
    };

    const mergedConf = { ...defaultConf, ...(blockConfig || {}) };
    const config = ensureConfig(argConfig);

    if (mergedConf.polyfill) {
        config.entry.polyfill = mergedConf.polyfill;
    }

    const enhance = mergedConf.hot ? enhanceForHotReload : elt => elt;

    for (let key in mergedConf.entries) {
        config.entry[key] = enhance(mergedConf.entries[key]);
    }

    return config;
};
