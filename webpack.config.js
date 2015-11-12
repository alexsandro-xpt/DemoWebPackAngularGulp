//var gulp = require('gulp');
var path = require("path");
var webpack = require("webpack");
var WebpackNotifierPlugin = require('webpack-notifier');


module.exports = {
    context: path.resolve(__dirname, "app"),
    devtool: 'eval',
    entry: {
        app: ['./assets/js/index.js'],
        vendors: ['angular', 'angular-resource', 'angular-ui-router', 'angular-sanitize', 'oclazyload'/*,'jquery', 'devextreme/js/dx.all'*/]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "assets/",
        filename: "js/appbundle.js"
    },
    externals:[
        {
            jquery:'jQuery',
            DevExpress:'DevExpress'
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
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery", DevExpress: "DevExpress", "window.DevExpress":"DevExpress"
        }),
        new WebpackNotifierPlugin(),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors/js/applibs.js'),
        new webpack.optimize.DedupePlugin()
	]
};

 /*'html!html-minify'*/