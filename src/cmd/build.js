// file
var fs = require('fs');
var path = require('path');

// models
var Route = require('../models/route')
var Parameter = require('../models/parameter')

// builders
var SwiftBuilder = require('../builders/SwiftBuilder.js')
var HtmlBuilder = require('../builders/HtmlBuilder.js')

// utils
var log = require('../utils/log');
var _ = require('lodash');


function build(jsonFilePath, outputDirectory, language = "swift") {
    if (jsonFilePath === undefined) log.error("--input parameter is missing");
    else if (outputDirectory === undefined) log.error("--output parameter is missing");
    else if (language === "objc") log.error("objc is not implemented");
    else if (language === "html") log.error("html is not implemented");
    else if (language !== "swift") log.error("--language value can be swift, objc or html");

    var self = this;
    var absoluteJsonFilePath = path.join(__dirname, '../..', jsonFilePath);
    var absoluteOutputPath = path.join(__dirname, '../..', outputDirectory);

    fs.readFile(absoluteJsonFilePath, 'utf8', function (err, data) {
        if (err) {
            log.error("json introuvable: " + absoluteJsonFilePath);
        } else {
            try {
                var json = JSON.parse(data);
                var routeArray = [];

                _.forEach(json, function (item, name) {
                    var route = new Route(name, json[name]);
                    routeArray.push(route);
                });

                var builder;
                switch (language) {
                    case "swift": builder = new SwiftBuilder(absoluteOutputPath, routeArray); break;
                    case "html": builder = new HtmlBuilder(absoluteOutputPath, routeArray); break;
                    default: log.error("ouais mais nan : " + language + " is not yet supported"); break;
                }

                log.success("\nDONE 🖕\n");
            } catch (error) {
                log.error("An error occured : " + error);
            }
        }
    });
}

module.exports = build;
