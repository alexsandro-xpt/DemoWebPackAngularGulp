var path = require("path");
var webpack = require("webpack");

module.exports = {
    context: __dirname + "/app",
    devtool: 'eval',
    entry: { app: ["./js/index.js"] },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "js/",
        filename: "bundle.js"
        /*path: __dirname + "/dist",
        filename: "bundle.js"*/
    },
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	]
};

