"use strict";

/**
 * Function returning a configurator (that is to say, a function creating a webpack configuration from another potentially partial configuration).
 * It takes an env object, an "argv" string array and any number of "block" function.
 *
 *
 * @param {Object} env an object, with environnement properties
 * @param {String[]} argv a string array, to respect webpack signature
 * @returns {Function} a function, which returns a wepack configuration according to config.
 */
const createConfigurator = function createConfigurator(env, argv) {
    return config =>
        Array.from(arguments)
            .slice(2)
            .filter(Boolean)
            .map(confFunc => confFunc(env, argv))
            .reduce((conf, blockFunc) => blockFunc(conf), config || {});
};

module.exports = createConfigurator;
