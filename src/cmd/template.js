// file
var files = require('../utils/files');
var path = require('path');

// utils
var log = require('../utils/log');


module.exports = {
    createFile: function (output) {
        if (output) {
            var inputPath = path.join(__dirname, '..', './assets/json/template.json');
            var outputPath = path.join(__dirname, '..', output);
            files.copyFile(inputPath, outputPath);
            log.success("template created at " + outputPath + ", have fun !");
        }

        else {
            log.error("output parameter is missing (ex. expedit-router -tempalte ./assets/router.json)");
        }
    }
}
