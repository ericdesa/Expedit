/* jslint node: true, es6, this */
"use strict";

// utils
var files = require("./files");

// libs
var chalk = require('chalk');


function success(message) {
    console.log(chalk.green(message));
}

function warning(message) {
    console.log(chalk.cyan(message));
}

function error(message) {
    console.log(chalk.red(message));
    process.exit();
}

function fileAdded(path) {
    console.log(" " + chalk.white.bgGreen("[added]") + " " + chalk.green(files.fileNameWithDirectoryFromPath(path)));
}

function fileDeleted(path) {
    console.log(" " + chalk.white.bgRed("[deleted]") + " " + chalk.red(files.fileNameWithDirectoryFromPath(path)));
}

function fileUpdated(path) {
    console.log(" " + chalk.white.bgGreen("[updated]") + " " + chalk.green(files.fileNameWithDirectoryFromPath(path)));
}

function fileKeeped(path) {
    console.log(" " + chalk.white.bgBlue("[keeped]") + " " + chalk.blue(files.fileNameWithDirectoryFromPath(path)));
}

module.exports.success = success;
module.exports.warning = warning;
module.exports.error = error;

module.exports.fileAdded = fileAdded;
module.exports.fileDeleted = fileDeleted;
module.exports.fileUpdated = fileUpdated;
module.exports.fileKeeped = fileKeeped;
