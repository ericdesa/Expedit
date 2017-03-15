/* jslint node: true, es6, this */
"use strict";

// libs
var fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp');

module.exports = {
    getCurrentDirectoryBase: function () {
        return path.basename(process.cwd());
    },

    copyFile: function (source, target) {
        var self = this;

        return createDirForPath(target).then(function () {
            return new Promise(function (resolve, reject) {
                var rd, wr;

                function rejectCleanup(err) {
                    rd.destroy();
                    wr.end();
                    reject(err);
                }

                rd = fs.createReadStream(source);
                rd.on('error', rejectCleanup);

                wr = fs.createWriteStream(target);
                wr.on('error', rejectCleanup);
                wr.on('finish', resolve);
                rd.pipe(wr);
            });
        });
    },

    readFile: function (source) {
        return new Promise(function (resolve, reject) {
            fs.readFile(source, function read(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },

    writeFile: function (content, target) {
        return createDirForPath(target).then(function () {
            fs.writeFileSync(target, content);
        });
    },

    findFilesInDir: function (startPath, extension) {
        return findFilesInDir(startPath, extension);
    },

    fileNameFromPath: function (path) {
        var components = path.split("/");
        return components[components.length - 1];
    },

    fileNameWithDirectoryFromPath: function (path) {
        var components = path.split("/");
        var fileName = components[components.length - 1];
        var directoryName = components[components.length - 2];
        return "/" + directoryName + "/" + fileName;
    }
};

function createDirForPath(inputPath) {
    var directoryToCreatePath;
    var components = inputPath.split('/');
    var lastComponent = components[components.length - 1];
    var isLastComponentAFile = lastComponent.indexOf('.') !== -1;

    if (isLastComponentAFile) {
        directoryToCreatePath = inputPath.replace(lastComponent, "");
    } else {
        directoryToCreatePath = inputPath;
    }

    return new Promise(function (resolve, reject) {
        mkdirp(directoryToCreatePath, function (err) {
            resolve();
        });
    });
}

// from http://stackoverflow.com/a/25478516/1335962
function findFilesInDir(startPath, extension) {
    var results = [];

    if (!fs.existsSync(startPath)) {
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            results = results.concat(findFilesInDir(filename, extension));
        }
        else if (filename.indexOf("." + extension) === (filename.length - extension.length - 1)) {
            results.push(filename);
        }
    }
    return results;
}
