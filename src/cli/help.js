/* jslint node: true, es6, this */
'use strict';

// inspired by : https://github.com/driftyco/ionic-cli/blob/690a447fbf87a592cae53551c25f23e2d9dd21c9/lib/utils/help.js


// libs
var CLI = require('clui'),
    chalk = require('chalk'),
    clc = require('cli-color'),
    _ = require('lodash');

// consts
var rightColumnPosition = 30
var indent = '  ';


// Tasks
// -----------------------------

function Task(name, usage, parameters) {
    this.name = name;
    this.usage = usage;
    this.parameters = parameters;
}

Task.prototype.getCommandLine = function () {
    var name = indent + this.name + indent;
    var dots = '';

    while ((name + dots).length < rightColumnPosition) {
        dots += '.';
    }

    return chalk.green.bold(name) + chalk.grey(dots) + '  ' + chalk.bold(this.usage);
};


function Parameter(name, usage, isOptional = false) {
    this.name = name;
    this.usage = usage;
    this.isOptional = isOptional;
}

Parameter.prototype.getParameterLine = function () {
    var name = indent + indent + indent + this.name + indent;
    var optional = this.isOptional ? ' ' + chalk.bold.yellow('(optional)') : '';
    var dots = '';
    while ((name + dots).length < rightColumnPosition) {
        dots += '.';
    }

    return chalk.yellow.bold(name) + chalk.grey(dots) + indent + this.usage + optional;
};


// Setup
// -----------------------------

function getTasks() {
    var taskArray = [];
    taskArray.push(new Task(
        'build',
        'create the router files from a json description',
        [
            new Parameter('--input', 'the path to the json file', false),
            new Parameter('--output', 'the output directory', true),
            new Parameter('--scheme', 'the app url scheme name used for the deeplink', true),
            new Parameter('--language', 'swift, html (swift by default)', true)
        ]
    ));

    taskArray.push(new Task(
        'template',
        'create a Router.json example file',
        [
            new Parameter('--output', 'the output directory (the current one by default)', true)
        ]
    ));

    return taskArray;
}


// Public
// -----------------------------

function print() {
    var lines = [
        '',
        chalk.bold('Available tasks: '),
        ''
    ];

    _.forEach(getTasks(), function (task) {
        lines.push(task.getCommandLine());

        _.forEach(task.parameters, function (parameter) {
            lines.push(parameter.getParameterLine());
        });

        lines.push('');
    });

    _.forEach(lines, function (line) {
        console.log(line);
    });
}


// Export
// -----------------------------

module.exports = { print };
