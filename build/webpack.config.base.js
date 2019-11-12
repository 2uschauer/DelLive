'use strict'
const path=require('path');
const webpack=require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // vue加载器
const PostStylus=require('poststylus'); // stylus加前缀
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理垃圾文件
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  context: path.resolve(__dirname,'../'),
  entry: ['babel-polyfill','./src/main.js'],
  module: {
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: "pre",
      exclude: /node_modules/,
      include: [resolve('src')],
      options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
        formatter: require('eslint-friendly-formatter'), // 指定错误报告的格式规范
        cache: true,
      }
    },{
      test: /\.js$/,
      loader: 'babel-loader',
      query:{
        presets: ['env']
      },
      exclude: file => (/node_modules/.test(file) &&!/\.vue\.js/.test(file))
    },{
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
      include: [resolve('src/icons')],
      options: {
        symbolId: 'icon-[name]'
      }
    },{
      test: /\.(png|jpe?g|gif|bmp|svg)$/,
      exclude: [resolve('src/icons'), resolve('src/static')],
      use: [{
        loader: 'url-loader',
        options: { // 配置图片编译路径
          limit: 8192, // 小于8k将图片转换成base64
          name: '[hash:8].[name].[ext]',
          outputPath: 'img/'
        }
      },{
        loader: 'image-webpack-loader', // 图片压缩
        options: {
          bypassOnDebug: true
        }
      }]
    },{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
      }]
    },{
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|flv)(\?.*)?$/,
      use: ['file-loader']
    },{
      test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader:'url-loader',
      exclude: [resolve('src/static')],
      options:{
          limit:8192,
          name:'fonts/[hash:8].[name].[ext]'
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.vue', '.styl', '.json'], // import引入文件的时候不用加后缀
    modules: [ // 配置路径别名
      'node_modules',
      resolve(__dirname, 'src/components'),
      resolve(__dirname, 'src/assets'),
    ],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    }
  },
  plugins: [
    new VueLoaderPlugin(), // vue加载器
    new webpack.BannerPlugin(`xs build at ${Date.now()}`), // 打包后在.js/.css页头的时间（并没什么卵用）
    new CleanWebpackPlugin(), // 每次打包之前清理打包目录
    new webpack.NamedModulesPlugin(), // 热更新 HMR
    new webpack.HotModuleReplacementPlugin(), // 热加载插件 HMR
    new webpack.LoaderOptionsPlugin({ // stylus加前缀
      options: {
        stylus: {
          use: [PostStylus(['autoprefixer'])]
        },
        babel: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    }),
    new webpack.ProvidePlugin({ // 配置第三方库
      $http: 'axios' // 在.vue文件中可以使用$http发送请求，不用每次都import Axios from 'axios';也不用挂载到vue原型链上
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups:{ // 这里开始设置缓存的 chunks
        vendor: { // key 为entry中定义的 入口名称
          chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          test: /node_modules/, // 正则规则验证，如果符合就提取 chunk (指定是node_modules下的第三方包)
          name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
          minChunks: 1,
          enforce: true
        },
        styles: {
          chunks: 'all',
          test: /\.(css|styl)$/,
          name: 'vendor',
          minChunks: 1,
          enforce: true
        }
      }
    }
  }
}
