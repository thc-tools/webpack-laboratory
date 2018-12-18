"use strict";

const createConfigurator = require("./create-configurator");
const createDefaultFiles = require("./create-default-files");
const deduplicate = require("./deduplicate");
const ensureConfig = require("./ensure-config");
const safeMerge = require("./safe-merge");
const envDefaults = require("./env-defaults");

module.exports = {
    createConfigurator,
    createDefaultFiles,
    deduplicate,
    envDefaults,
    ensureConfig,
    safeMerge
};
