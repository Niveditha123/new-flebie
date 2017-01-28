var ncp = require('ncp').ncp;
var walk = require('walk');

function FileListPlugin(options) {}

FileListPlugin.prototype.apply = function(compiler) {
    compiler.plugin('after-emit', function(compilation, callback) {
        // Create a header string for the generated file:
        var filelist = 'In this build:\n\n';
        console.log("copyToDist");
        copytoDist(function() {
            addchunkhashtofiles(compilation.chunks,function(){
                callback();
            });
        });


        // Insert this list into the Webpack build as a new file asset:
        compilation.assets['filelist.md'] = {
            source: function() {
                return filelist;
            },
            size: function() {
                return filelist.length;
            }
        };


    });



};




function copytoDist(cb) {

    console.log("copying to dist");
    ncp.limit = 16;

    options = {
        clobber: false
    }
    ncp("./views", "./dist", options, function(err) {
        if (err) {
            return console.error(err);
        }
        cb();
    });

}




function addchunkhashtofiles(chunks,cb) {
    var files = [];

    // Walker options
    var walker = walk.walk('./dist', {
        followLinks: false
    });

    walker.on('file', function(root, stat, next) {
        // Add this file to the list of files
        files.push(root + '/' + stat.name);
        next();
    });
    walker.on('end', function() {
        var completed = 0;
        for (var i = 0; i < files.length; i++) {
            readWriteAsync(files[i], chunks,function(){
                completed++;
                if(completed == files.length){
                    cb();
                }
            })

        };



    });

}


var fs = require('fs');

function readWriteAsync(filename, chunks,cb) {
    fs.readFile(filename, 'utf-8', function(err, data) {
        if (err) throw err;
        for (var i = 0; i < chunks.length; i++) {
            var reCSS = new RegExp(chunks[i].name + ".css");
            var reJS = new RegExp(chunks[i].name + "bundle.js");
            data = data.replace(reJS, chunks[i].name + 'bundle.' + chunks[i].renderedHash + '.js');
            data = data.replace(reCSS, chunks[i].name + '.' + chunks[i].renderedHash + '.css');

        };






            fs.writeFile(filename, data, 'utf-8', function(err) {
                if (err) throw err;
                console.log('filelistAsync complete');
                cb();
            });
    });
}





module.exports = FileListPlugin;
