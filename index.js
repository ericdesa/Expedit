#!/usr/bin/env node
/* jslint node: true, es6, this */
"use strict";

// cli
var build = require('./src/cli/build');
var help = require('./src/cli/help');
var template = require('./src/cli/template');
var version = require('./package.json').version;

// libs
var CLI = require('clui'),
    Spinner = CLI.Spinner,
    clc = require('cli-color');

var chalk = require('chalk'),
    clear = require('clear'),
    figlet = require('figlet'),
    parseArgs = require('minimist');

clear();
new CLI.Line().output();

console.log('=====================================================');
console.log(figlet.textSync('EXPEDIT', { horizontalLayout: 'full' }));
console.log('=================== version', version, '===================');

process.env.version = version;

var command = process.argv[2]
var argv = parseArgs(process.argv);

switch (command) {
    case "template": template.createFile(argv.output); break;
    case "build": build(argv.input, argv.output, argv.language, argv.scheme); break;
    default: help.print(); break;
}

new CLI.Line().output();
