var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
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
            orderSummaryPage:['./client/scripts/orderSummaryPage.js'],
            editOrder:['./client/scripts/editOrder.js']
        },
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'scripts/[name]bundle.js',
            publicPath: '/public/',
        },
        plugins: [
            new webpack.NoErrorsPlugin(),
            new ExtractTextPlugin("styles/[name].css")
        ],

        module: {
            loaders: [
                {
                    test: /.jsx?$/,
                    loader: 'babel',
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
