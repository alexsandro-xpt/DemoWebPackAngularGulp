//var gulp = require('gulp');
var path = require("path");
var webpack = require("webpack");
var WebpackNotifierPlugin = require('webpack-notifier');


module.exports = {
    context: path.resolve(__dirname, "app"),
    devtool: 'eval',
    entry: {
        app: ['./js/app.js'],
        vendors: ['angular', 'angular-resource', 'angular-ui-router', 'oclazyload', 'devextreme/js/dx.all']
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "js/",
        filename: "bundle.js"
    },
    externals:[
        {
            //angular:'angular'
        }
    ],
    resolve: {
        root: [path.join(__dirname, "bower_components")]
    },
    module: {
        noParse: [],
        loaders: [
            { test: /\.html$/, loader:'html' },
            { test: /\.css$/, loader:'style-loader!css-loader' }
        ]
    },
    /*'html-minify-loader': {
        empty: true,        // KEEP empty attributes
        cdata: true,        // KEEP CDATA from scripts
        comments: true     // KEEP comments
    },*/
	plugins: [
		/*new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            //mangle: false
            mangle: {
                except: ['$q', '$ocLazyLoad']
            }
        }),*/
        new WebpackNotifierPlugin(),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
	]
};

 /*'html!html-minify'*/