/*jslint node: true, es6, this */
"use strict";

// utils
var generateFilesInTemplateDirectory = require('./commonBuilder');


// builder implementation
// -----------------------------

function HtmlBuilder(outputDirectory, routeArray) {
    generateFilesInTemplateDirectory(outputDirectory, routeArray, 'html', 'html');
}

module.exports = HtmlBuilder;
