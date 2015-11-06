var path = require("path");
var webpack = require("webpack");

var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
    context: path.resolve(__dirname, "app"),
    devtool: 'eval',
    entry: {
        app: ['./js/app.js'], vendors: ['angular'] 
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "js/",
        filename: "bundle.js"
        //,chunkFilename: "[id].bundle.js"
    },
    resolve: {
        root: [path.join(__dirname, "bower_components")]
    },
    module: {
        noParse: [],
        loaders: [
            { test: /\.html$/, loader:'html!html-minify' },
            /*{
                test: /\.js$/,
                
                // There is not need to run the loader through
                // vendors
                exclude: [node_modules_dir],
                loader: 'raw'
            }*/
        ]
    },
    /*'html-minify-loader': {
        empty: true,        // KEEP empty attributes
        cdata: true,        // KEEP CDATA from scripts
        comments: true     // KEEP comments
    },*/
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            mangle: false, minimize: true
        }),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
	]
};

 /*'html!html-minify'*/