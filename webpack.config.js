var path = require("path");
var webpack = require("webpack");
var WebpackNotifierPlugin = require('webpack-notifier');


module.exports = {
    context: path.resolve(__dirname, "app"),
    devtool: 'eval',
    entry: {
        app: ['./js/index.js'/*, './template/main/main.controller.js'*/]
        //,'index.html': 'index.html'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "js/",
        filename: "bundle.js"
    },
    resolve: {
        root: [path.join(__dirname, "bower_components")]
    },
    module: {
        noParse: [],
        loaders: [
            { test: /\.html$/, loader: 'raw!html-minify'/*'html'*/ },
        ]
    },
	plugins: [
		//new webpack.optimize.UglifyJsPlugin(),
        new WebpackNotifierPlugin(),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
	]
};

