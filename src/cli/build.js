/* jslint node: true, es6, this */
"use strict";

// models
var Route = require('../models/route'),
    Parameter = require('../models/parameter');

// builders
var SwiftBuilder = require('../builders/SwiftBuilder.js'),
    HtmlBuilder = require('../builders/HtmlBuilder.js');

// utils
var log = require('../utils/log');

// libs
var fs = require('fs'),
    path = require('path'),
    _ = require('lodash');


// build implementation
// -----------------------------

function build(jsonFilePath, outputDirectory, language = "swift", scheme = "") {
    if (jsonFilePath === undefined) {
        log.error("--input parameter is missing");
    } else {
        switch (language) {
            case "objc":
                log.error("objc is not implemented");
                break;
            case "swift":
            case "html":
                break;
            default:
                log.error("--language can be swift, objc or html");
                break;
        }
    }

    var absoluteJsonFilePath = path.resolve(process.cwd(), jsonFilePath);
    var absoluteOutputPath;
    if (outputDirectory === undefined) {
        absoluteOutputPath = path.parse(absoluteJsonFilePath).dir + '/';
    } else {
        absoluteOutputPath = path.resolve(process.cwd(), outputDirectory) + '/';
    }

    fs.readFile(absoluteJsonFilePath, 'utf8', function (err, data) {
        if (err) {
            log.error("json not found at " + absoluteJsonFilePath);
        } else {
            try {
                var json = JSON.parse(data);
                var routeArray = [];

                _.forEach(json, function (item, name) {
                    var route = new Route(name, json[name]);
                    routeArray.push(route);
                });

                switch (language) {
                    case "swift": new SwiftBuilder(absoluteOutputPath, routeArray, scheme); break;
                    case "html": new HtmlBuilder(absoluteOutputPath, routeArray, scheme); break;
                }
            } catch (error) {
                log.error("An error occured : " + error);
            }
        }
    });
}

module.exports = build;
