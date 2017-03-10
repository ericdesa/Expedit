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

module.exports = {
    template: function (output) {
        if (output) {
            var inputPath = path.join(__dirname, '..', './assets/json/template.json');
            var outputPath = path.join(__dirname, '..', output);
            files.copyFile(inputPath, outputPath);

            console.log(
                chalk.green("template created at " + outputPath + ", have fun !")
            );
        }

        else {
            console.log(
                chalk.red("output parameter is missing (ex. expedit-router -tempalte ./assets/router.json)")
            );
        }
    }
}
