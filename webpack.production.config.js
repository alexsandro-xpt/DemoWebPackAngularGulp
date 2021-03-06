
var path = require("path");
var webpack = require("webpack");
var node_modules_dir = path.resolve(__dirname, 'node_modules');

/*'html!html-minify'*/
 
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
        filename: "js/appbundle.js",
        chunkFilename: "js/[id].bundle.js"
    },
    externals:[
        {
            jquery:'jQuery',
            DevExpress:'DevExpress'
        }
    ],
    resolve: {
        root: [path.join(__dirname, "bower_components")],
        alias:[
            {angular: 'angular/angular.min.js'},
            {'angular-resource': 'angular-resource/angular-resource.min.js'},
            {'angular-sanitize': 'angular-sanitize/angular-sanitize.min.js'},
            {'angular-ui-router': 'angular-ui-router/release/angular-ui-router.min.js'},
            {oclazyload: 'oclazyload/dist/oclazyload.min.js'}
        ]
    },
    module: {
        noParse: [
            'angular/angular.min.js',
            'angular-resource/angular-resource.min.js',
            'angular-sanitize/angular-sanitize.min.js',
            'angular-ui-router/release/angular-ui-router.min.js',
            'oclazyload/dist/oclazyload.min.js'
        ],
        loaders: [
            { test: /\.html$/, loader:'html!html-minify' },
            { test: /\.(ttf|eot|woff(2)?)/, loader:'file' },
            { test: /\.css$/, loader:'style-loader!css-loader' }
            
        ]
    },
    /*'html-minify-loader': {
        empty: true,        // KEEP empty attributes
        cdata: true,        // KEEP CDATA from scripts
        comments: true     // KEEP comments
    },*/
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$q', '$ocLazyLoad']
            },
            minimize: true,
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery", DevExpress: "DevExpress"/*, "window.DevExpress":"DevExpress"*/
        }),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors/js/applibs.js'),
        new webpack.optimize.DedupePlugin()
	]
};
