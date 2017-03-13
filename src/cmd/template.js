// file
var files = require('../utils/files');
var path = require('path');

// utils
var log = require('../utils/log');


module.exports = {
    createFile: function (output) {
        if (output && typeof output === "string") {
            var inputPath = path.join(__dirname, '..', './templates/json/exmaple.json');
            var outputPath = path.join(__dirname, '..', output);
            files.copyFile(inputPath, outputPath);
            log.success("template created at " + outputPath + ", have fun !");
        }

        else {
            log.error("output parameter is missing");
        }
    }
}
