var gulp = require('gulp');
var shell = require('gulp-shell');
var del = require('del');
var webfontsGenerator = require('webfonts-generator');
var fs = require('fs');
var runSequence = require('run-sequence');
var ncp = require("ncp");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var webpackProdConfig = require("./webpack.prod.config.js");
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

gulp.task('clean-public', function(){
    return del(['./public/*'])
});
gulp.task('webpackFunnel', function(done){
    webpack(webpackConfig).run(onBuild(done));
});
gulp.task('webpackprodFunnel', function(done){
    webpack(webpackProdConfig).run(onBuild(done));
});

gulp.task('webpackProdConfig', shell.task([
    'gulp webpackprodFunnel'
]));

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
});


gulp.task("copyFonts",function(){
    ncp("./client/fonts","./public/fonts",function(){
        console.log("font copied!!!");
    });
})

gulp.task("copyCSS",function(){
    ncp("./client/css","./public/styles",function(){
        console.log("font copied!!!");
    });
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

gulp.task('clean-dist', function(){
    return del(['./dist/*'])
});

gulp.task("default", function(){
	runSequence('clean-dist','clean-public',"copyFonts","font-icon" ,"copyCSS",'makedist',"copyimages","webpack");
});

gulp.task("prod", function(){
	runSequence('clean-dist',"clean-public","copyFonts","font-icon","copyCSS" ,"copyimages","webpackProdConfig");
});
