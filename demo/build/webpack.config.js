// nodejs 中的path模块
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: path.resolve(__dirname, '../src/main.js'),
    // 输出配置
    output: {
        // 输出路径是 myProject/output/static
        path: path.resolve(__dirname, '../output/static'),
        publicPath: 'static/',
        filename: '[name].[hash].js'
        /*,
        chunkFilename: '[id].[chunkhash].js'*/
    },
    devtool:false,
    resolve: {
        extensions: [ '.js', '.vue'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {

        loaders: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue-loader?vue-html-loader?vue-style-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?presets=es2015',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
               NODE_ENV: '"production"'
           }
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },
          sourceMap: false
        }),

        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: path.resolve(__dirname, '../src/index.html'),
            inject: true
        })
    ]
}