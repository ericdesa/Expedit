#!/usr/bin/env node

// cli
var CLI = require('clui'),
    Spinner = CLI.Spinner,
    clc = require('cli-color');

// console
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var parseArgs = require('minimist')

// cmd
var help = require('./src/cmd/help');
var template = require('./src/cmd/template');
var build = require('./src/cmd/build');


// -------------------------

clear();
new CLI.Line().output();

console.log(
    chalk.yellow(
        figlet.textSync('EXPEDIT', { horizontalLayout: 'full' })
    )
);

// -------------------------

var argv = parseArgs(process.argv);

if (argv['help']) help.print();
else if (argv['template']) template.createFile(argv['template']);
else if (argv['input'] || argv['output']) build(argv['input'], argv['output'], argv['language']);
else help.print();

new CLI.Line().output();
