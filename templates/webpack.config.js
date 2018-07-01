const configFunc = require('@thc/webpack-react/lib/webpack-config');
const {prepareEntries} = require('@thc/webpack-react/lib/utils');
//const path = require('path');

module.exports = (processEnv, argv) => {
    const env = processEnv || process.env;
    const config = configFunc(env, argv);

    // Add your entries and anything else needed
    // https://webpack.js.org/configuration/entry-context/#entry
    // https://webpack.js.org/configuration/resolve/#resolve-modules
    // https://webpack.js.org/configuration/resolve/#resolve-alias
    // https://webpack.js.org/configuration/entry-context/#context
    config.entry.main = prepareEntries(env, ['./src/app.js']);

    return config;
};