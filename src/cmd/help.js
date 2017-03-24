/* jslint node: true, es6, this */
"use strict";

// libs
var CLI = require('clui'),
    chalk = require('chalk'),
    clc = require('cli-color'),
    _ = require('lodash');


// help implementation
// -----------------------------

module.exports = {
    print: function () {

        test("build",
            "create the router files",
            [
                "$expedit build --input ./Router.json (build swift routes in the current directory)",
                "$expedit build --input ./Router.json --output ./Routes/ (build swift routes in another directory)",
                "$expedit build --input ./Router.json --scheme expedit (build swift routes with deeplink support)",
                "$expedit build --input ./Router.json --scheme expedit --language html (build deeplink html doc)",
            ],
            [
                ["--input", "the path to the json file"],
                ["--language", "swift, html (optional, swift by default)"],
                ["--output", "the output directory (optional)"],
                ["--scheme", "the app url scheme name used for the deeplink (optional)"]
            ]);

        test("template",
            "create a Router.json example file",
            [
                "$expedit template"
            ],
            [
                ["--output", "the output directory (optional)"],
            ]);

        function test(command, description, examples, parameters) {
            var Line = CLI.Line;
            new Line().output();

            console.log(chalk.cyan.bold(command));

            console.log('  ' + chalk.white.underline('usage:'));
            console.log('  ' + chalk.white(description));

            new Line().output();
            console.log('  ' + chalk.white.underline('parameters:'));
            _.forEach(parameters, function (item) {
                var param = '  ' + item[0];
                var desc = '  ' + item[1];

                new Line()
                    .column(param, 15)
                    .column(desc, 85)
                    .output();
            });

            new Line().output();
            console.log('  ' + chalk.white.underline('examples:'));
            _.forEach(examples, function (item) {
                console.log('  ' + chalk.white(item));
            })
        }
    }
}
