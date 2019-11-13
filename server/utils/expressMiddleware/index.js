'use strict'

const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const errorHandler = require('errorhandler')
const ejs = require('ejs')
const path = require('path')
const config = require('../../config')
module.exports = function(app) {
  const env = app.get('env')
  app.set('views', config.root + 'server/views')
  app.engine('html', ejs.renderFile)
  app.set('view engine', 'html')
  app.use(compression())
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json())
  app.use(methodOverride())
  app.use(cookieParser())
  app.use(morgan('dev'))
  app.set('appPath', path.join(__dirname, '../../../src'))
  app.set('index', path.join(config.root, 'src', 'index.html'))
  app.use(express.static(app.get('appPath')))
  if (env === 'dev') {
    app.use(errorHandler())
  }
}
