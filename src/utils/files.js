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
};

function createDirForPath(inputPath) {
    var path;
    var components = inputPath.split('/');
    var lastComponent = components[components.length - 1];

    if (lastComponent.indexOf('.') !== -1) {
        path = inputPath.replace(lastComponent, "");
    } else {
        path = inputPath;
    }

    return new Promise(function (resolve, reject) {
        mkdirp(path, function (err) {
            resolve();
        });
    });
}