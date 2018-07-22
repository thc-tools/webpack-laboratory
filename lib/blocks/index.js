const handleAssets = require("./assets");
const handleJs = require("./babel");
const handleCss = require("./css");
const handleScss = require("./scss");
const configEntries = require("./entry");
const addHotReload = require("./hot-reload");
const addHtmlIndex = require("./html");
const miscOptions = require("./misc");
const optimize = require("./optimize");
const configOutput = require("./output");
const generateSourcemap = require("./sourcemap");
const utilities = require("./utility");

module.exports = {
    handleAssets,
    handleJs,
    handleCss,
    handleScss,
    configEntries,
    addHotReload,
    addHtmlIndex,
    miscOptions,
    optimize,
    configOutput,
    generateSourcemap,
    utilities
};
