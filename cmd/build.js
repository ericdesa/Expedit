// file
var fs = require('fs');
var files = require('../lib/files');
var path = require('path');

// cli
var CLI = require('clui'),
    clc = require('cli-color');

// console
var chalk = require('chalk');

// utils
var _ = require('lodash');

function build(jsonFilePath, outputDirectory, language = "swift") {
    if (jsonFilePath === undefined) this.logError("--input parameter is missing");
    else if (outputDirectory === undefined) this.logError("--output parameter is missing");
    else if (language === "objc") this.logError("objc is not implemented");
    else if (language === "html") this.logError("html is not implemented");
    else if (language !== "swift") this.logError("--language value can be swift, objc or html");

    else if (jsonFilePath) {
        var self = this;
        var absoluteJsonFilePath = path.join(__dirname, '..', jsonFilePath);
        var absoluteOutputPath = path.join(__dirname, '..', outputDirectory);

        fs.readFile(absoluteJsonFilePath, 'utf8', function (err, data) {
            if (err) {
                self.logError("json introuvable: " + absoluteJsonFilePath);
            } else {
                var json = JSON.parse(data);
                var routeArray = [];

                _.forEach(json, function (item, name) {
                    var route = new Route(name, json[name]);
                    routeArray.push(route);
                });

                var builder;
                if (language === "swift") {
                    builder = new SwiftBuilder(absoluteOutputPath);
                }

                _.forEach(routeArray, function (route) {
                    builder.generateFile(route);
                });

                console.log(chalk.yellow("\nDONE 🖕\n"));
            }
        });
    } else {

    }
}

function logSuccess(message) {
    console.log(chalk.green(message));
}

function logError(message) {
    console.log(chalk.red(message));
}

function Route(name, json) {
    this.name = name;
    this.URI = json["URI"];
    this.controller = json["controller"];
    this.parameterArray = [];

    var self = this;
    _.forEach(this.URI.split("/"), function (param) {
        if (param.indexOf(":") === 0) {
            var name = param.replace(":", "").replace("?", "");
            var isOptional = param.indexOf("?") !== -1;
            var regex = (json["requirements"] || [])[name].split().join();
            var parameter = new Parameter(name, isOptional, regex);
            self.parameterArray.push(parameter);
        }
    });
}

function Parameter(name, isOptional = false, regex = ".*") {
    this.name = name;
    this.isOptional = isOptional;
    this.regex = regex;
}

function SwiftBuilder(outputDirectory) {
    this.outputDirectory = outputDirectory;

    SwiftBuilder.prototype.generateFile = function (route) {
        var humanTemplatePath = path.join(__dirname, '../assets/swift/human.swift');
        var machineTemplatePath = path.join(__dirname, '../assets/swift/machine.swift');

        var humanFilePath = path.join(this.outputDirectory, 'human', 'Route' + route.name + '.swift');
        var machineFilePath = path.join(this.outputDirectory, 'machine', '_' + 'Route' + route.name + '.swift');

        files.copyFile(humanTemplatePath, humanFilePath);
        files.copyFile(machineTemplatePath, machineFilePath);

        logSuccess(" > " + route.name + " created");
    }

}

module.exports.build = build;
