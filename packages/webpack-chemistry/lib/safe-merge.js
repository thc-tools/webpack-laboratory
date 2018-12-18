"use strict";

/**
 * Safe shallow merge function, to add defaults to an object.
 *
 * @param {Object} defaults the object containing default values (can be null, empty, ...)
 * @param {Object} config the object containing custom values (can be null, empty, ...)
 * @returns {Object} the
 */
const safeMerge = (defaults, config) => {
    return { ...(defaults || {}), ...(config || {}) };
};

module.exports = safeMerge;
