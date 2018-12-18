"use strict";

/**
 * Ensure the webpack config object is properly initialized, with empty objects or arrays.
 *
 * @param {Object} config a webpack config, can be null, partial, or empty
 * @returns {Object} an object, with missing properties initialized
 */
const ensureConfig = config => {
    let builtConf = config || {};
    builtConf.output = builtConf.output || {};
    builtConf.entry = builtConf.entry || {};
    builtConf.watchOptions = builtConf.watchOptions || {};
    builtConf.optimization = builtConf.optimization || {};
    builtConf.optimization.splitChunks = builtConf.optimization.splitChunks || {};
    builtConf.optimization.minimizer = builtConf.optimization.minimizer || [];
    builtConf.resolve = builtConf.resolve || {};
    builtConf.resolve.extensions = builtConf.resolve.extensions || [];
    builtConf.module = builtConf.module || {};
    builtConf.module.rules = builtConf.module.rules || [];
    builtConf.plugins = builtConf.plugins || [];

    return builtConf;
};

module.exports = ensureConfig;
