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

function generateFile(inputPath, targetPath, routeArray, route = undefined, scheme = undefined) {
    var fileName = files.fileNameFromPath(targetPath);
    var isHumanFile = (route !== undefined && fileName.indexOf("_") === -1) || fileName.indexOf("RouteHuman") !== -1;
    var isTargetFileExist = fs.existsSync(targetPath);

    var parameter = {};
    parameter.routeArray = routeArray;

    if (route !== undefined) {
        parameter.route = route;
    }
    if (scheme !== undefined) {
        parameter.scheme = scheme;
    }

    return files.readFile(inputPath).then(function (data) {
        var compiled = _.template(data);
        var content = compiled(parameter);

        if (isHumanFile && isTargetFileExist) {
            log.fileKeeped(targetPath);
        } else {
            return files.writeFile(content, targetPath).then(function () {
                if (isTargetFileExist) log.fileUpdated(targetPath);
                else log.fileAdded(targetPath);
            }).catch(function (error) {
                log.error(targetPath + " failed: " + error);
            });
        }
    });
}

function generateFilesInTemplateDirectory(outputDirectory, routeArray, scheme, templateName, extension) {
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
                generateFile(inputPath, targetRoutePath, routeArray, route, scheme);
            });
        } else {
            fileCreatedArray.push(targetPath);
            generateFile(inputPath, targetPath, routeArray, undefined, scheme);
        }
    });

    return fileCreatedArray;
}


module.exports = generateFilesInTemplateDirectory;