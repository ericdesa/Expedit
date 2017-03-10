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

// utils
var _ = require('lodash');

// files
var fs = require('fs');
var files = require('./lib/files');

// cmd
var help = require('./cmd/help');
var template = require('./cmd/template');
var build = require('./cmd/build');


// -------------------------

clear();
new CLI.Line().output();

console.log(
    chalk.yellow(
        figlet.textSync('EXPEDIT', { horizontalLayout: 'full' })
    )
);

//var status = new Spinner('Authenticating you, please wait...');
//status.start();
//status.stop();

// -------------------------

var argv = parseArgs(process.argv);

if (argv['help']) help.print();
else if (argv['template']) template.createFile(argv['template']);
else if (argv['input'] || argv['output']) build.build(argv['input'], argv['output'], argv['language']);
else help.print();

new CLI.Line().output();
