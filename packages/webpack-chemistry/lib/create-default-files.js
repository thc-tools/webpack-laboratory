"use strict";

const fs = require("fs");
const path = require("path");

const copyDefaultToWorkingDir = (templateDir, localDir) => filename => {
    console.log(`Checking for ${filename}...`);
    const destFile = path.resolve(localDir, filename);
    if (!fs.existsSync(destFile)) {
        fs.copyFileSync(templateDir + "/" + filename, destFile);
        console.log("Copying a default file");
    } else {
        console.log("Already exists");
    }
};

/**
 * Function to copy default/template files to working dir. This will not erase existing files.
 *
 * @param {String} templateDir the path of the templates folder to copy (must not ends with /, like ./templates)
 * @param {String} fromDir value of __dirname
 */
const copyDefaultsToWorkingDir = (templateDir, fromDir) => {
    // Getting path from where this process is executed from
    // but, keeping only the part before node_modules
    const localDir = process
        .cwd()
        .split("node_modules")
        .shift();

    // If localDir is different from __dirname, this means we are not working inside the module,
    // But installing it (useful to avoid unnecessary postinstall copy)
    if (localDir !== fromDir) {
        fs.readdirSync(templateDir).forEach(copyDefaultToWorkingDir(templateDir, localDir));
    } else {
        console.log("Local folder, not copying script");
    }
};

module.exports = copyDefaultsToWorkingDir;
