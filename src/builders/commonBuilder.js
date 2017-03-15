/*jslint node: true, es6, this */
"use strict";

// utils
var fs = require('fs'),
    files = require('../utils/files'),
    log = require('../utils/log');

// libs
var path = require('path'),
    _ = require('lodash');


// builder implementation
// -----------------------------

function generateFile(inputPath, targetPath, routeArray, route = undefined) {
    var components = targetPath.split("/");
    var directoryName = components[components.length - 2];
    var fileName = directoryName + "/" + components[components.length - 1];

    return files.readFile(inputPath).then(function (data) {
        var parameter = {};
        parameter.routeArray = routeArray;

        if (route !== undefined) {
            parameter.route = route;
        }

        var compiled = _.template(data);
        var content = compiled(parameter);
        return files.writeFile(content, targetPath);
    }).then(function () {
        log.success(" > " + fileName + " created");
    }).catch(function (error) {
        log.error(" > " + fileName + " failed: " + error);
    });
}

function generateFilesInTemplateDirectory(outputDirectory, routeArray, templateName, extension) {
    var rootPath = path.join(__dirname, '../../templates/' + templateName);
    var templateFilePathArray = files.findFilesInDir(rootPath, extension);
    var fileCreatedArray = [];

    _.forEach(templateFilePathArray, function (inputPath) {
        var targetPath = outputDirectory + inputPath.replace(rootPath, "").replace("/", "");
        var isRouteFile = targetPath.indexOf("{{routeName}}") !== -1;
        if (isRouteFile) {
            _.forEach(routeArray, function (route) {
                var targetRoutePath = targetPath.replace("{{routeName}}", "Route" + route.name);
                fileCreatedArray.push(targetRoutePath);
                generateFile(inputPath, targetRoutePath, routeArray, route);
            });
        } else {
            fileCreatedArray.push(targetPath);
            generateFile(inputPath, targetPath, routeArray);
        }
    });

    return fileCreatedArray;
}


module.exports = generateFilesInTemplateDirectory;