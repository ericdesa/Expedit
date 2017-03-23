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
        if (output && typeof output === "string") {
            var inputPath = path.join(__dirname, '..', './templates/json/exmaple.json');
            var outputPath = path.resolve(process.cwd(), output)+'/';
            files.copyFile(inputPath, outputPath);
            log.success("template created at " + outputPath + ", have fun !");
        } else {
            log.error("output parameter is missing");
        }
    }
};
