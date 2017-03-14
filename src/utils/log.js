/* jslint node: true, es6, this */
"use strict";

// libs
var chalk = require('chalk');


function success(message) {
    console.log(chalk.green(message));
}

function error(message) {
    console.log(chalk.red(message));
    process.exit();
}


module.exports.success = success;
module.exports.error = error;
