var gulp = require("gulp");
var mainBowerFiles = require('gulp-main-bower-files');
var gulpFilter = require('gulp-filter');
var flatten = require('gulp-flatten');
var gutil = require("gulp-util");
var path = require("path");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var gulpWebpack = require('gulp-webpack');
var gulpsync = require('gulp-sync')(gulp);



gulp.task('copyJs', function() {
    
     gulp.src('app/assets/vendors/js/', {read: false}).pipe(clean());
    
    var filter = gulpFilter(['jquery.min.js','dx.all.js','globalize.js']);
    
    return gulp.src('bower_components/**/*.js')//min.
        .pipe(flatten()).pipe(filter)
        //.pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/assets/vendors/js/'))
        .on('end', function(){
          gutil.log('copyJs', gutil.colors.yellow('Os JS foram copiados com sucesso!'));
        });
});


gulp.task('copyCss', function() {
    
     gulp.src('app/assets/vendors/css/', {read: false}).pipe(clean());
    
    var filter = gulpFilter(['dx.common.css', 'dx.light.css']);
    
    return gulp.src('bower_components/**/*.css')
        .pipe(flatten()).pipe(filter)
        .pipe(concat('main.css'))
        .pipe(cssmin({keepSpecialComments : 0}))//https://github.com/jakubpawlowicz/clean-css
        .pipe(gulp.dest('app/assets/vendors/css/'))
        .on('end', function(){
          gutil.log('copyCss', gutil.colors.yellow('Os Css foram copiados com sucesso!'));
        });
});

gulp.task('copyIcon', function() {
    
    gulp.src('app/assets/vendors/css/icons/', {read: false}).pipe(clean());
    
    var filter = gulpFilter(['dxicons.eot', 'dxicons.ttf', 'dxicons.woff', 'dxiconsios.eot', 'dxiconsios.ttf', 'dxiconsios.woff']);
    
    return gulp.src('bower_components/**/*.*')
    .pipe(flatten()).pipe(filter)
    .pipe(gulp.dest('app/assets/vendors/css/icons/'))
    .on('end', function(){
        gutil.log('copyIcon', gutil.colors.yellow('As fontes foram copiados com sucesso!'));
    });

});

//https://www.npmjs.com/package/gulp-webpack
gulp.task("copyLibs", ['copyJs', 'copyCss', 'copyIcon']);

gulp.task("webpack", function(callback) {
    
    
    gulp.src('dist', {read: false}).pipe(clean());
    
    var distWebpack = Object.create(require("./webpack.production.config.js"));
    
    gulp.src('app/assets/js/index.js').pipe(gulpWebpack(distWebpack)).pipe(gulp.dest('dist/assets/'))
    .on('end', function(){
        gulp.src('app/index.html').pipe(gulp.dest('dist'));
        gulp.src('app/assets/vendors/js/*.*').pipe(gulp.dest('dist/assets/vendors/js'));
    });
    

    
    return callback();
    /*
    return webpack(distWebpack, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        
        //gulp.src('app/assets/css/*.*').pipe(gulp.dest('dist/assets/css/'));
        //gulp.src('app/assets/js/*.*').pipe(gulp.dest('dist/assets/js/'));
        gulp.src('app/index.html').pipe(gulp.dest('dist'));
        
        callback();
    });
    */


});


gulp.task("webpack-dev-server", function(callback) {
    
    var myDevConfig = Object.create(webpackConfig);
    myDevConfig.devtool = "sourcemap";
    myDevConfig.debug = true;
    myDevConfig.entry.app.unshift("webpack-dev-server/client?http://0.0.0.0:8080");
    //myDevConfig.entry.app.unshift('webpack/hot/only-dev-server');

    // Start a webpack-dev-server
    var compiler = webpack(myDevConfig);

    new WebpackDevServer(compiler, {
        // server and middleware options
        contentBase: myDevConfig.context,
		publicPath: "/" + myDevConfig.output.publicPath,
		stats: {
			colors: true
		}
        //,hot: true
    }).listen(8080, "0.0.0.0", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/");

        // keep the server alive or continue?
        // callback();
    });
});





gulp.task('build', gulpsync.sync(['copyJs', 'copyCss', 'copyIcon', 'webpack']));


gulp.task('dev', ['copyJs', 'copyCss', 'copyIcon', 'webpack-dev-server']);

gulp.task('run', ['webpack-dev-server']);


gulp.task('default', ['run']);