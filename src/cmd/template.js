/* jslint node: true, es6, this */
"use strict";

// utils
var log = require('../utils/log'),
    files = require('../utils/files');

// libs
var path = require('path');


// template implementation
// -----------------------------

module.exports = {
    createFile: function (output) {
        var inputPath = path.join(__dirname, '..', './templates/json/Router.json');
        var outputPath;
        if (output && typeof output === "string") {
            outputPath = path.resolve(process.cwd(), output) + '/';
        } else {
            outputPath = path.resolve(process.cwd()) + '/';
        }

        files.copyFile(inputPath, outputPath);
        log.success("template created at " + outputPath + "");
    }
};
