
// models
var Parameter = require('./parameter');

// utils
var _ = require('lodash');


// Route
// -----------------------------

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

    this.regex = this.getRegex();
}


// helpers
// -----------------------------

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


module.exports = Route;
