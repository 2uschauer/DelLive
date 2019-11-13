'use strict'
const express = require('express')
const http = require('http')
const config = require('./config')
const path = require('path')
const returnJson = require('./utils/returnJson')
const logger = require('./utils/log')
const TagPlatForm = logger.TagPlatForm
const app = express()
app.use('/backend', require('./utils/proxy')(config.ziker.appIntranetPrefix))

if (config.env !== 'env') {
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath'),'index.html'))
    })
}
require('./utils/expressMiddleware')(app)
app.use(function(error, req, res, next) {
  TagPlatForm.error('Error error is: ',req.url, error)
  res.json(returnJson.RESULT.SYSTEM_FAIL, 500)
  next()
})
const server = http.createServer(app)
function startServer() {
  server.listen(config.port, function() {
    console.info(`Express server listening on ${config.port}`,`environment is ${process.env.NODE_ENV}`)
  })
}
setImmediate(startServer)
