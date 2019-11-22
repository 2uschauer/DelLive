'use strict'
const express = require('express')
const http = require('http')
const https = require('https')
const fs = require('fs')
const config = require('./config')
const path = require('path')
const returnJson = require('./utils/returnJson')
const logger = require('./utils/log')
const TagPlatForm = logger.TagPlatForm
const app = express()
const { startLive } = require('./utils')
let subProcess = startLive()

app.use('/user', require('./routes/user')())

app.use('/restart/live', function(req, res) {
  try {
    process.kill(subProcess.pid + 1, 'SIGKILL')
    process.kill(subProcess.pid, 'SIGKILL')
    subProcess = startLive()
    res.json({
      responseCode: '000000',
      responseMsg: '重启成功',
      data: null
    })
  } catch (err) {
    res.json({
      responseCode: '000001',
      responseMsg: `${err}`,
      data: null
    })
  }
})

app.use('/liveServer', require('./utils/proxy')(config.ziker.appIntranetPrefix))
require('./utils/expressMiddleware')(app)

if (config.env !== 'dev') {
  app.route('/*')
    .all(function(req, res, next) {
      if (req.protocol === 'http') {
        res.redirect(301, `https://www.die.live`);
      } else next()
    })
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath'),'index.html'))
    })
}

app.use(function(error, req, res, next) {
  TagPlatForm.error('Error error is: ',req.url, error)
  res.json(returnJson.RESULT.SYSTEM_FAIL, 500)
  next()
})
const server = config.env === 'dev' ? http.createServer(app) : https.createServer({
  key: fs.readFileSync(`${config.ceFilePath}/privkey.pem`),
  cert: fs.readFileSync(`${config.ceFilePath}/cert.pem`)
},app)
function startServer() {
  server.listen(config.port, function() {
    console.info(`Express server listening on ${config.port}`,`environment is ${process.env.NODE_ENV}`)
  })
}
setImmediate(startServer)
if (config.dev === 'prod') {
  const httpServer = http.createServer(app)
  // eslint-disable-next-line no-inner-declarations
  function startHttpServer() {
    httpServer.listen(config.httpPort, function() {
      console.info(`Express server listening on ${config.httpPort}`,`environment is ${process.env.NODE_ENV}`)
    })
  }
  setImmediate(startHttpServer)
}
