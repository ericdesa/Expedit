/* jslint node: true, es6, this */
"use strict";

// models
var Parameter = require('./parameter');

// libs
var _ = require('lodash');


// Route
// -----------------------------

function Route(name, json) {

    // parsed
    this.name = name;
    this.URI = json.URI;
    this.controller = json.controller;
    this.parameterArray = [];

    // computed
    this.regex = "";
    this.fileName = 'Route' + this.name;

    var self = this;
    _.forEach(this.URI.split("/"), function (component, index) {
        if (component.indexOf(":") === 0) {
            var parameterName = component.replace(":", "").replace("?", "");
            var isOptional = component.indexOf("?") !== -1;
            var paramRegex = ((json.requirements || [])[parameterName] || ".*").split().join(); // to remove the double \ required by json
            var parameter = new Parameter(parameterName, index, isOptional, paramRegex);
            self.parameterArray.push(parameter);
        }
    });

    this.regex = this.getRegex();
}


// Public
// -----------------------------

Route.prototype.getRegex = function () {
    var self = this;
    var forceOptional = 0;
    var nbBraceToClose = 0;
    var regex = this.URI.split("/").map(function (component) {
        if (component.indexOf(":") === 0) {
            var name = component.replace(":", "").replace("?", "");
            var param = self.parameterArray.find(function (currentParam) {
                return currentParam.name === name;
            });

            var paramRegex = param.regex;
            forceOptional = param.isOptional;
            if (forceOptional) {
                nbBraceToClose += 1;
                return '(\/' + paramRegex;
            } else {
                return '\/' + paramRegex;
            }
        } else {
            return component;
        }
    }).join('');

    for (var i = 0; i < nbBraceToClose; i += 1) {
        regex += ')?';
    }

    return ('\/?' + regex + '\/?');
};

Route.prototype.getRegexForParameterName = function (name) {
    var parameter = this.parameterArray.find(function (parameter) {
        return parameter.name === name;
    });

    return (parameter || { regex: ".[^\/]*" }).regex;
}

Route.prototype.hasParameters = function () {
    return this.parameterArray.length > 0;
}


module.exports = Route;
