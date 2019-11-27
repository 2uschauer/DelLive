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
    new webpack.DefinePlugin({
      'process.env': require('./config/' + process.env.NODE_ENV.trim() + '.env')
    }),
    new VueLoaderPlugin(), // vue加载器
    new webpack.BannerPlugin(`xs build at ${Date.now()}`), // 打包后在.js/.css页头的时间（并没什么卵用）
    new CleanWebpackPlugin(), // 每次打包之前清理打包目录
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
    namedChunks:true,
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: 100,
      maxInitialRequests: 100,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups:{ // 这里开始设置缓存的 chunks
        dll: {
          name:'dll',
          minChunks: 1,
          test: /\/node_modules\/(vue|vue-router|vuex|babel-polyfill|normalize.css|element-ui|lodash|nprogress|axios|lodash-es|sockjs-client|core-js)\//,
          priority: 100, // 权重
          maxSize: 500000,
        },
        'async-commons': {  // 异步加载公共包、组件等
          chunks: 'async',
          minChunks: 2,
          name: 'async-commons',
          priority: 90,
        },
        commons: {
          chunks: 'all',
          name: 'commons',
          minChunks: 2,
          priority: 80, // 权重
        },
        vendors: {
          minChunks: 1,
          test: /[\\/]node_modules[\\/]/,
          priority: 70, // 权重
          minSize: 0,
          // maxSize: 100000,
          name:'vendors'
        },
        styles: {
          chunks: 'all',
          test: /\.(css|styl(us)?|sass|scss)$/,
          name: 'styles',
          minChunks: 1,
          // maxSize: 100000,
          enforce: true
        },
        'async-main': {
          chunks: 'async', //initial表示提取入口文件的公共部分
          minChunks: 1, //表示提取公共部分最少的文件数
          minSize: 0, //表示提取公共部分最小的大小
          name: 'async-main'
        },
        main: {
          priority: -25, // 权重
          chunks: 'all', //initial表示提取入口文件的公共部分
          minChunks: 1, //表示提取公共部分最少的文件数
          minSize: 0, //表示提取公共部分最小的大小
          // maxSize: 100000,
          name: 'main'
        }
      }
    }
  }
}
