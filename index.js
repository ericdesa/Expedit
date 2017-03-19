/* jslint node: true, es6, this */
"use strict";

// cmd
var build = require('./src/cmd/build');
var help = require('./src/cmd/help');
var template = require('./src/cmd/template');
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

console.log(
    chalk.yellow('=====================================================')
);

console.log(
    chalk.yellow(
        figlet.textSync('EXPEDIT', { horizontalLayout: 'full' })
    )
);

console.log(
    chalk.yellow('=================== version', version, '===================')
);


var argv = parseArgs(process.argv);
process.env.version = version;

if (argv.help) help.print();
else if (argv.template) template.createFile(argv.template);
else if (argv.input || argv.output) build(argv.input, argv.output, argv.language);
else help.print();

new CLI.Line().output();
