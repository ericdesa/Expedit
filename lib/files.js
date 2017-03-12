var fs = require('fs');
var path = require('path');

module.exports = {
    getCurrentDirectoryBase: function () {
        return path.basename(process.cwd());
    },

    directoryExists: function (filePath) {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    },

    copyFile: function (source, target) {
        return new Promise(function (resolve, reject) {
            var rd = fs.createReadStream(source);
            rd.on('error', rejectCleanup);
            var wr = fs.createWriteStream(target);
            wr.on('error', rejectCleanup);
            function rejectCleanup(err) {
                rd.destroy();
                wr.end();
                reject(err);
            }
            wr.on('finish', resolve);
            rd.pipe(wr);
        });
    },

    readFile: function (source) {
        return new Promise(function (resolve, reject) {
            fs.readFile(source, function read(err, data) {
                if (err) reject(err);
                else resolve(data);
            });
        });
    },

    writeFile: function (content, target) {
        fs.writeFileSync(target, content);
    }
};