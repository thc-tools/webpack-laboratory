const {
    handleAssets,
    handleJs,
    handleCss,
    emptyConf,
    configEntries,
    addHotReload,
    addHtmlIndex,
    miscOptions,
    optimize,
    configOutput,
    generateSourcemap,
    utilities
} = require("@thc/webpack-react/lib/blocks");

const { envDefaults } = require("@thc/webpack-react/lib/utils");

module.exports = (processEnv, argv) => {
    const env = envDefaults(processEnv);
    // Every function accepts a config object
    // Object is gonna be shallow merged with default conf
    const configFunctions = [
        emptyConf(), // Must be first
        handleJs(),
        handleCss(),
        handleAssets(),
        configEntries(), //Default entry object is : { main : "./src/app.js" }
        addHotReload(),
        addHtmlIndex(),
        miscOptions(),
        optimize(),
        configOutput(),
        generateSourcemap(),
        utilities() // Must be after output => depends on config.output.path
    ];

    const config = configFunctions
        .filter(Boolean) // Allow simple filtering, by setting the function as test && config()
        .map(confFunc => confFunc(env, argv)) // We bind our env, defaulted with some values
        .reduce((conf, elt) => conf(elt), {});

    // The idea is that we could replace emptyConf, with an existing webpack config function
    // or a lambda returning a pre-initialized object

    return config;
};
