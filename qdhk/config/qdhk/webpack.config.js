// nodejs 中的path模块
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: {
        main:path.resolve(__dirname, '../../src/qdhk/main.js'),
        vendor: ['vue','vue-resource','vue-router','./src/qdhk/js/aes_2','fastclick','./src/qdhk/js/flexible','./src/qdhk/js/lrz.all.bundle','./src/qdhk/js/picker.min','./src/qdhk/js/contants']
    },
    // 输出配置
    output: {
        // 输出路径是 myProject/output/static
        path: path.resolve(__dirname, '../../output/qdhk'),
        publicPath: '',
        filename: "[name].[hash].bundle.js",
        chunkFilename: "[name].[hash].chunk.js"
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
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: "css-loader",
                        options: {
                            sourceMap: false,
                            minimize:true
                        }
                    }
                })
                //loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
                
            },
             {
                test: /\.json$/,
                loader: 'json-loader'
              },
              {
                test: /\.html$/,
                loader: 'vue-html-loader'
              },
              {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                  limit: 10000,
                  name:'[hash].[ext]'
                }
              },
              {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                  limit: 10000
                }
              }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name:'vendor',  filename:'vendor[hash].js'}),
        new webpack.DefinePlugin({
          'process.env': {
               NODE_ENV: '"production"'
           }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../../src/qdhk/index.html'),
            inject: true
        }),
        new ExtractTextPlugin({
            filename: "[name].[hash:6].css",
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },
          sourceMap: false
        })
    ]
}