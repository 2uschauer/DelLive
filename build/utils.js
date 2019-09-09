'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function(__path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'dev' ?
  config.dev.assetsSubDirectory : config.build.assetsSubDirectory
  return path.posix.join(assetsSubDirectory,__path)
}

exports.cssLoader = function(options) {
  options = options || {}
  const cssLoader = {
    loader: 'css-loader',
    option: {
      sourceMap: options.sourceMap
    }
  }
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: option.sourceMap
    }
  }

  function generateLoaders(loader, loaderOption) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    
    if (loader) {
      loaders.push({
        loader: loader  + '-loader',
        options: Object.assign({}, loaderOption, {
          sourceMap: options.sourceMap
        })
      })
      if (options.extract) {
        return ExtractTextPlugin.extract({
          use: loaders,
          fallback: 'vue-style-loader'
        })
      } else {
        return ['vue-style-loader'].concat(loaders)
      }
    }
    
    return {
      css: generateLoaders(),
      postcss: generateLoaders(),
      less: generateLoaders('less'),
      sass: generateLoaders('sass', { indentedSyntax: true}),
      scss: generateLoaders('sass'),
      stylus: generateLoaders('stylus'),
      styl: generateLoaders('stylus')
    }
  }
}

exports.styleLoader = function(options) {
  const output = []
  const loaders = exports.cssLoader(options)
  
  for(const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader,
    })
  }
  
  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')
 
  return (severity, errors) => {
    if (severity !== 'error') return 
    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      TITLE: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}