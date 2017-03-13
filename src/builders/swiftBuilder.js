// file
var fs = require('fs');
var path = require('path');

// utils
var files = require('../utils/files');
var log = require('../utils/log');

var _ = require('lodash');


// builder implementation
// -----------------------------

function SwiftBuilder(outputDirectory, routeArray) {
    var self = this;
    this.outputDirectory = outputDirectory;

    _.forEach(routeArray, function (route) {
        self.generateRouteFile(route);
    });

    self.generateCommonFiles(routeArray);
}

// helpers
// -----------------------------

SwiftBuilder.prototype.generateRouteFile = function (route) {
    var self = this;
    var parameters = { 'route': route };

    var templatePath = path.join(__dirname, '../../templates/swift/human/Human.swift');
    var filePath = path.join(this.outputDirectory, 'human', 'Route' + route.name + '.swift');
    this.generateFileWithParameters(parameters, templatePath, filePath).then(function () {

        var templatePath = path.join(__dirname, '../../templates/swift/machine/Machine.swift');
        var filePath = path.join(self.outputDirectory, 'machine', '_' + 'Route' + route.name + '.swift');
        return self.generateFileWithParameters(parameters, templatePath, filePath);

    }).then(function () {
        log.success(" > " + route.name + " created");
    }).catch(function (error) {
        log.error(" > " + route.name + " failed : " + error);
    });
}

SwiftBuilder.prototype.generateCommonFiles = function (routeArray) {
    var self = this;
    var templatePath = path.join(__dirname, '../../templates/swift/common/Route.swift');
    var filePath = path.join(self.outputDirectory, 'common/Route.swift');
    var parameters = { 'routeArray': routeArray };

    self.generateFileWithParameters(parameters, templatePath, filePath)
        .then(function () {
            var templatePath = path.join(__dirname, '../../templates/swift/common/UIViewController+Route.swift');
            var filePath = path.join(self.outputDirectory, 'common/UIViewController+Route.swift');
            return self.generateFileWithParameters(parameters, templatePath, filePath)
        }).then(function () {
            log.success(" > Common files created");
        }).catch(function (error) {
            log.error(" > Common files failed : " + error);
        });
}

SwiftBuilder.prototype.generateFileWithParameters = function (parameters, templateFilePath, targetFilePath) {
    return files.readFile(templateFilePath).then(function (content) {
        var compiled = _.template(content);
        var content = compiled(parameters);
        files.writeFile(content, targetFilePath)
    });
}

module.exports = SwiftBuilder;