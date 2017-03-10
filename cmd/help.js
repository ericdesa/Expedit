// cli
var CLI = require('clui'),
    clc = require('cli-color');

// console
var chalk = require('chalk');

// utils
var _ = require('lodash');

module.exports = {
    help: function () {
        var Line = CLI.Line;

        var header = new Line()
            .column('Parameter', 15, [clc.cyan])
            .column('Description', 85, [clc.cyan])
            .output();

        var commands = [
            ["--language", "swift, objc, html"],
            ["--template", "create a json template (ex. ./assets/router.json)"],
            ["--input", "the router json (ex. ./assets/router.json)"],
            ["--output", "the output directory (ex. ./models/router)"],
            ["--help", "show this (thank you captain obvious)"],
        ];

        _.forEach(commands, function (item) {
            var param = item[0];
            var desc = item[1];

            new Line()
                .column(param, 15)
                .column(desc, 85)
                .output();
        });
    }
}
