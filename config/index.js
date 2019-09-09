'use strict'
const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    proxyTable: {
      '/': {
        target : 'http://localhost:9000',
        secure: false,
        bypass: function(req) {
          if(req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }
        }
      }
    },
    host: 'localhost',
    port: 9500,
    autoOpenBrowser: true,
    erroeOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay:true,
    devtool: 'source-map',
    cacheBusting: true,
    cssSourceMap: false,
  },
  build: {
    index: path.join(__dirname, '../dist/src/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/src'),
    assetsPublicPath: '/',
    serverDirectory: path.join(__dirname, '../dist/server'),
    productionSourceMap: false,
    useEslint: false,
    showEslintErrorsInOverlay:false,
    devtool: 'source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: false,
  }
}