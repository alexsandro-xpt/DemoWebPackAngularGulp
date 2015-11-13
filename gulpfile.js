var gulp = require("gulp");
var mainBowerFiles = require('main-bower-files');
var gutil = require("gulp-util");
var path = require("path");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");


var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;
myDevConfig.entry.app.unshift("webpack-dev-server/client?http://0.0.0.0:8080");
//myDevConfig.entry.app.unshift('webpack/hot/only-dev-server');


gulp.task('copyJs', function() {
    return gulp.src(mainBowerFiles({ filter: /jquery.js|dx\.all\.js|globalize\.js$/i }))
        .pipe(gulp.dest('app/assets/vendors/js/'))
});


gulp.task('copyCss', function() {
    return gulp.src(mainBowerFiles({ filter: /dx\.common\.css|dx\.light\.css$/i }))
        .pipe(gulp.dest('app/assets/vendors/css/'))
});

gulp.task('copyIcon', function() {
    return gulp.src(mainBowerFiles({ filter: /(dxicons|dxiconsios)\.(eot|ttf|woff)$/i }))
        .pipe(gulp.dest('app/assets/vendors/css/icons/'))
});

gulp.task("copyLibs", ['copyJs', 'copyCss', 'copyIcon']);

gulp.task("webpack", function(callback) {
    

    
    // run webpack
    webpack(myDevConfig/*{
        // configuration
    }*/, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});


gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack(myDevConfig/*{
        // configuration
    }*/);

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


gulp.task('default', ['webpack-dev-server']);