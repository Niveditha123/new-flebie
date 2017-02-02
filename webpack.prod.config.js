var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
var changeFilePlugin = require('./build/changeFilePlugin.js');
console.log("prdo wjjsj");
module.exports = {

        devtool: 'source-map',
        node: {
            console: true,
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            __filename: true,
            __dirname: true
        },
        entry: {
            common: ['./client/scripts/common.js'],
            index: ['./client/scripts/index.js'],
            search: ['./client/scripts/search.js'],
            checkout: ['./client/scripts/checkout.js'],
            testlist: ['./client/scripts/testlist.js'],
            popularlabs: ['./client/scripts/popularlabs.js'],
            populartests: ['./client/scripts/populartests.js'],
            popularpackages: ['./client/scripts/popularpackages.js'],
            confirm: ['./client/scripts/confirm.js'],
            listlabsfortest:['./client/scripts/listlabsfortest.js'],
            dashboard:['./client/scripts/dashboard.js'],
            other:['./client/scripts/other.js'],
            pageTwo:['./client/scripts/pageTwo.js'],
            pageOne:['./client/scripts/pageOne.js']
        },
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'scripts/[name]bundle.[chunkHash].js',
            publicPath: '/public/',
        },
        plugins: [
            new webpack.NoErrorsPlugin(),
            new ExtractTextPlugin("styles/[name].[chunkHash].css"),
          new webpack.optimize.UglifyJsPlugin({
              minimize: true
          }),
          new changeFilePlugin(),
        ],

        module: {
            loaders: [
                {
                    test: /.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015', 'react']
                    }
                }, {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                }, {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
                }

            ]
        }
    };







function FileListPlugin(options) {}

FileListPlugin.prototype.apply = function(compiler) {
    compiler.plugin('after-emit', function(compilation, callback) {

    });
};
