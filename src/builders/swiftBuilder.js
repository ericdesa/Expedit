/*jslint node: true, es6, this */
"use strict";

// utils
var generateFilesInTemplateDirectory = require('./commonBuilder');


// builder implementation
// -----------------------------

function SwiftBuilder(outputDirectory, routeArray) {
    generateFilesInTemplateDirectory(outputDirectory, routeArray, 'swift', 'swift');
}

module.exports = SwiftBuilder;
