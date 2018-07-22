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

const { envDefaults, createConfigurator } = require("@thc/webpack-react/lib/utils");

module.exports = (processEnv, argv) => {
    const env = envDefaults(processEnv);
    // Every function accepts a config object
    // Object is gonna be shallow merged with default conf
    // Allow simple filtering, by setting the function as booleanTest && config()
    const configurator = createConfigurator(
        env, // Environnement variables (used for default values)
        argv, // Argv options given to webpack (not used for now, only for respecting webpack format)
        // List of blocks
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
        utilities()
    );

    // Configurator can take a already built object config to complete
    // const config = { module: { rules: [ test:'lol', loader:'example']}};
    // return configurator(config);
    return configurator();
};
