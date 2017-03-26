var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var webpack = require("webpack")
// 引入基本配置
var config = require('./webpack.config');

config.output.publicPath = '/';
//config.devtool="cheap-module-eval-source-map";  
config.devtool=false;  


config.plugins = [
    new webpack.DefinePlugin({
      'process.env':  {
               NODE_ENV: '"development"'
           }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
        filename: 'src/index.html',
        template: path.resolve(__dirname, '../src/index.html'),
        inject: true
    }),
    new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },
          sourceMap: false
        }),
    new ExtractTextPlugin({
            filename: "[name].[hash:6].css",
            disable: false,
            allChunks: true
        })
];

// 动态向入口配置中注入 webpack-hot-middleware/client
// var devClient = 'webpack-hot-middleware/client';
var devClient = './build/dev-client';
Object.keys(config.entry).forEach(function (name, i) {
    var extras = [devClient]
    config.entry[name] = extras.concat(config.entry[name])
})
module.exports = config;