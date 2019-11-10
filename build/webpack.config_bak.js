/**
 * webpack config file
 */


const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry: path.join(__dirname,"../src/main.js"),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,"../dist"),
    },
    module: {
        rules: [
           // .js 文件处理 loader
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
           // .css 文件处理 loader
           {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
           // 图片文件处理 loader
            {
                test: /\.(jpg|png|gif|jpeg)/,
                use: 'url-loader?limit=8192'
            },
            // .vue 文件处理 loader
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
              test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
              loader:'url-loader',
              exclude: [path.join(__dirname,'src/static')],
              options:{
                  limit:8192,
                  name:'fonts/[name].[hash:8].[ext]'
              }
            }
        ]
    },
    
   // 插件
    plugins: [
        new HtmlWebpackPlugin({
            templalte: path.join(__dirname,'../index.html')
        }),
        new VueLoaderPlugin(),
    ],
    mode: 'production'
};