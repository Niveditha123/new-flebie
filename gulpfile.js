var gulp = require('gulp');
var shell = require('gulp-shell');
var del = require('del');
var webfontsGenerator = require('webfonts-generator');
var fs = require('fs');
var runSequence = require('run-sequence');
var ncp = require("ncp");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var minify = require('gulp-minify');

function onBuild(done) {
  return function(err, stats) {

    if(err) {
    }
    else {
        console.log(stats.toString({
            minimial:true,
            chunks:false
        }));
    }

    if(done) {
      done();
    }
  }
}
gulp.task('webpack', shell.task([
    'gulp webpackFunnel'
]));

gulp.task('clean-css', function(){
    return del(['./public/styles/*'])
});
gulp.task('webpackFunnel', function(done){
    webpack(webpackConfig).run(onBuild(done));
});



gulp.task("copyimages",function(){
    /*ncp("./client/rootfiles","./public/rootfiles",function(){
        gulp.src('./public/rootfiles/sw-serviceWorker.js')
            /*.pipe(minify({
                ext:{
                    src:'-debug.js',
                    min:'.js'
                },
            }))
            .pipe(gulp.dest('./public/rootfiles/'))
    });*/
    ncp("./client/images","./public/images",function(){});
    ncp("./client/Images","./public/Images",function(){});
})


gulp.task("makedist",function(){



    ncp.limit = 16;

    ncp("./views", "./dist", {}, function(err) {
        if (err) {
            return console.error(err);
        }

    });


})



gulp.task("font-icon", function() {
    var cssFontsUrl = "/public/fonts/";
    var svgFiles = getFileList('client/icons');

    webfontsGenerator({
        files: svgFiles,
        dest: 'public/fonts',
        cssFontsUrl: cssFontsUrl
    }, function(error) {
        if (error) console.log('Fail!', error)
        else console.log('Icon font Generation Done!')
    })
})


function getFileList(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

gulp.task("default", function(){
	runSequence("clean-css","font-icon" ,"webpack","copyimages");

});

