const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')
const path=require('path');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin'); // 自动生成index.html
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const cssConfig = [
  'vue-style-loader',
  {
    loader: 'css-loader',
    options: {
        sourceMap: true
    }
  },
  'postcss-loader'
]
const stylusConfig = [
  'vue-style-loader',
  {
    loader: 'css-loader',
    options: {
        sourceMap: true
    }
  },{
    loader: 'stylus-loader',
    options: {
        sourceMap: true
    }
  }
];
const sassConfig = [
  'vue-style-loader',
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
    filename: '[name].js', // [name] 是entry的key
    publicPath: '/'
  },
  devtool: 'eval-source-map',
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
  devServer: {
    contentBase: resolve(__dirname, 'dist'), // 将 dist 目录下的文件，作为可访问文件。
    compress: true, // 开启Gzip压缩
    host: 'localhost', // 设置服务器的ip地址，默认localhost
    port: 9000, // 端口号
    open:true, // 自动打开浏览器
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html', // 引入模版
      favicon: 'src/static/images/favicon.ico',
      filename: 'index.html',
      minify: { // 对index.html压缩
        collapseWhitespace: false // 去掉index.html的空格
        ,removeAttributeQuotes: false // 去掉引号
      },
      hash: true,
      inject: true, // 去掉上次浏览器的缓存（使浏览器每次获取到的是最新的html）
    }),
    new MiniCssExtractPlugin({ // 分离css
      filename: '[name].css',
      allChunks: true
    }),
  ]
})
module.exports = webpackConfig