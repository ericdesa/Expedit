/*jslint node: true, es6, this */
"use strict";

// utils
var generateFilesInTemplateDirectory = require('./commonBuilder'),
    files = require('../utils/files'),
    log = require('../utils/log');

// libs
var fs = require("fs"),
    _ = require("lodash");


// builder implementation
// -----------------------------

function SwiftBuilder(outputDirectory, routeArray, scheme) {
    var previousFilePathArray = this.getPreviousFilePathArray(outputDirectory);
    var newFilePathArray = generateFilesInTemplateDirectory(outputDirectory, routeArray, scheme, 'swift', 'swift');
    this.deleteObsoleteFiles(previousFilePathArray, newFilePathArray);
}

SwiftBuilder.prototype.getPreviousFilePathArray = function (outputDirectory) {
    return files.findFilesInDir(outputDirectory, "swift");
};

SwiftBuilder.prototype.deleteObsoleteFiles = function (previousFilePathArray, newFilePathArray) {
    _.forEach(previousFilePathArray, function (path) {
        var shouldRemoveFile = newFilePathArray.indexOf(path) === -1;
        if (shouldRemoveFile) {
            fs.unlink(path);
            log.fileDeleted(path);
        }
    });
};

module.exports = SwiftBuilder;
