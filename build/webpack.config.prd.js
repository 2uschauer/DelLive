'use strict'
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')
const path=require('path');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin'); // 自动生成index.html
const copyWebpackPlugin = require('copy-webpack-plugin')
const EnvConfig = require('./config/' + process.env.NODE_ENV.trim() + '.env')
const webpack = require('webpack')
const cssConfig = [
  MiniCssExtractPlugin.loader, 
  {
    loader: 'css-loader',
    options: {
        sourceMap: false
    }
  },
  'postcss-loader'
]
const stylusConfig = [
  MiniCssExtractPlugin.loader, 
  {
    loader: 'css-loader',
    options: {
        sourceMap: false
    }
  },{
    loader: 'stylus-loader',
    options: {
        sourceMap: false
    }
  }
];
const sassConfig = [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
        sourceMap: true
    }
  },{
    loader: 'sass-loader',
    options: {
        sourceMap: true
    }
  }
];
const webpackConfig = merge(baseWebpackConfig,{
  output: {
    path: path.resolve(__dirname, '../dist/src'), // 打包目录
    filename: 'javascript/[hash:8].[name].js', // [name] 是entry的key
    publicPath: '/'
  },
  devtool: false,
  module: {
    rules: [{
      test: /\.css$/,
      use:cssConfig
    },{
      test: /\.styl(us)?$/,
      use: stylusConfig
    },{
      test: /\.(sass|scss)$/,
      use: sassConfig
    },{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        hotReload: true, // 热重载
        loaders:{
          css: cssConfig,
          stylus: stylusConfig
        }
      },
    }]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      'process.env':EnvConfig
    }),
    new HtmlWebpackPlugin({
      template: 'index.html', // 引入模版
      favicon: 'src/static/images/favicon.ico',
      filename: 'index.html',
      minify: { // 对index.html压缩
        collapseWhitespace: true, // 去掉index.html的空格
        removeAttributeQuotes: true, // 去掉引号
        removeComments: true,
      },
      // hash: true,
      // inject: true, // 去掉上次浏览器的缓存（使浏览器每次获取到的是最新的html）
    }),
    new MiniCssExtractPlugin({ // 分离css
      filename: 'stylesheets/[hash:8].[name].css',
      allChunks: true
    }),
    new copyWebpackPlugin([{
      from: path.resolve(__dirname, '../server'),
      to: path.resolve(__dirname, '../dist/server')
    }])
  ]
})
module.exports = webpackConfig