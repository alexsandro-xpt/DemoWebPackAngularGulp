var gulp = require("gulp");
var gutil = require("gulp-util");
var path = require("path");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");


var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;
myDevConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:8080");
//myDevConfig.entry.app.unshift('webpack/hot/only-dev-server');


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
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/");

        // keep the server alive or continue?
        // callback();
    });
});


gulp.task('default', ['webpack-dev-server']);