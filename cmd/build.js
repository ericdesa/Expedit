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
                try {
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

                    var templatePath = path.join(__dirname, '../assets/swift/common/Route.swift');
                    var filePath = path.join(outputDirectory, 'common/Route.swift');
                    builder.generateFileWithParameters({ routeArray: routeArray }, templatePath, filePath)
                        .then(function () {
                            var templatePath = path.join(__dirname, '../assets/swift/common/UIViewController+Route.swift');
                            var filePath = path.join(outputDirectory, 'common/UIViewController+Route.swift');
                            return builder.generateFileWithParameters({ routeArray: routeArray }, templatePath, filePath)
                        }).then(function () {
                            logSuccess(" > Common files created");
                        }).catch(function (error) {
                            logError(" > Common files failed : " + error);
                        });

                    console.log(chalk.yellow("\nDONE 🖕\n"));
                } catch (error) {
                    logError("An error occured : " + error);
                }
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
    // parsed
    this.name = name;
    this.URI = json["URI"];
    this.controller = json["controller"];
    this.parameterArray = []

    // computed
    this.regex = "";
    this.fileName = 'Route' + this.name;

    var self = this;
    _.forEach(this.URI.split("/"), function (component) {
        if (component.indexOf(":") === 0) {
            var name = component.replace(":", "").replace("?", "");
            var isOptional = component.indexOf("?") !== -1;
            var regex = ((json["requirements"] || [])[name] || ".*").split().join(); // to remove the double \ required by json
            regex = regex.replace(".*", ".[^\/]*"); // exclude the parameter delimiter from the * regex
            var parameter = new Parameter(name, isOptional, regex);
            self.parameterArray.push(parameter);
        }
    });

    Route.prototype.getRegex = function () {
        var self = this;
        var forceOptional = 0;
        var nbBraceToClose = 0;
        var regex = this.URI.split("/").map(function (component) {
            if (component.indexOf(":") === 0) {
                var name = component.replace(":", "").replace("?", "");
                var param = self.parameterArray.find(function (param) { return param.name === name })
                var regex = param.regex
                forceOptional = param.isOptional
                if (forceOptional) {
                    nbBraceToClose++;
                    return '(\/' + regex
                }
                else {
                    return '\/' + regex
                }
            } else {
                return component
            }
        }).join('');

        for (i = 0; i < nbBraceToClose; i++) {
            regex += ')?'
        }

        return ('\/?' + regex + '\/?');
    }

    this.regex = this.getRegex();
}

function Parameter(name, isOptional = false, regex = ".*") {
    this.name = name;
    this.isOptional = isOptional;
    this.regex = regex;
}

function SwiftBuilder(outputDirectory) {
    this.outputDirectory = outputDirectory;

    SwiftBuilder.prototype.generateFile = function (route) {

        var self = this;
        var parameters = { 'route': route };

        var templatePath = path.join(__dirname, '../assets/swift/human/Human.swift');
        var filePath = path.join(this.outputDirectory, 'human', 'Route' + route.name + '.swift');
        this.generateFileWithParameters(parameters, templatePath, filePath).then(function () {

            var templatePath = path.join(__dirname, '../assets/swift/machine/Machine.swift');
            var filePath = path.join(self.outputDirectory, 'machine', '_' + 'Route' + route.name + '.swift');
            return self.generateFileWithParameters(parameters, templatePath, filePath);

        }).then(function () {
            logSuccess(" > " + route.name + " created");
        }).catch(function (error) {
            logError(" > " + route.name + " failed : " + error);
        });
    }

    SwiftBuilder.prototype.generateFileWithParameters = function (parameters, templateFilePath, targetFilePath) {
        return files.readFile(templateFilePath).then(function (content) {
            var compiled = _.template(content);
            var content = compiled(parameters);
            files.writeFile(content, targetFilePath)
        });
    }

}

module.exports.build = build;
