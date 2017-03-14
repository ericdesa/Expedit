/* jslint node: true, es6, this */
"use strict";

function Parameter(name, isOptional = false, regex = ".*") {
    this.name = name;
    this.isOptional = isOptional;
    this.regex = regex.replace(".*", ".[^\/]*"); // exclude the parameter delimiter from the * regex
}

module.exports = Parameter;