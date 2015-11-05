var path = require("path");
var webpack = require("webpack");
//var BowerWebpackPlugin = require("bower-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, "app"),
    devtool: 'eval',
    entry: {
        app: ["./js/index.js"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "js/",
        filename: "bundle.js"
    },
    resolve: {
        root: [path.join(__dirname, "bower_components")]
    },
    /*loaders: [
      {
        test:   /\.css$/,
        loader: "style-loader!css-loader"
      }
    ],*/
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
        //new BowerWebpackPlugin()
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
	]
};

