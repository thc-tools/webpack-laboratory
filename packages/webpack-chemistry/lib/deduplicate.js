"use strict";

/**
 * This functions deduplicates the elements given as arguments. It uses Set equality comparison.
 *
 * @returns an array containing deduplicated values.
 */
const deduplicate = function deduplicate() {
    return Array.from(new Set(Array.from(arguments).reduce((acc, elt) => acc.concat(elt || []), [])));
};

module.exports = deduplicate;
