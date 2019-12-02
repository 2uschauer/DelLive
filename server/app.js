'use strict'
const express = require('express')
const http = require('http')
const https = require('https')
const fs = require('fs')
const config = require('./config')
const path = require('path')
const returnJson = require('./utils/returnJson')
const { TagPlatForm } = require('./utils/log')
const app = express()
const { LiveHouse } = require('./utils/mongo')
// const { startLive } = require('./utils')
// let subProcess = startLive()
require('./utils/expressMiddleware')(app)
app.use('/api',require('./router')())
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
  TagPlatForm.error(`[Error]Request ${req.originalUrl} Error: ${error}`)
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
if (config.env !== 'dev') {
  const httpServer = http.createServer(app)
  // eslint-disable-next-line no-inner-declarations
  function startHttpServer() {
    httpServer.listen(config.httpPort, function() {
      console.info(`Express server listening on ${config.httpPort}`,`environment is ${process.env.NODE_ENV}`)
    })
  }
  setImmediate(startHttpServer)
}
const NodeMediaServer = require('node-media-server');

const liveConfig = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 7001,
    allow_origin: '*'
  },
  auth: {
    play: false,
    publish: true,
    secret: config.live.secret
  }
};

const nms = new NodeMediaServer(liveConfig)
nms.run();

nms.on('prePublish', (id, StreamPath, args) => {
  const liveHouseName = StreamPath.split('/')[2]
  LiveHouse.updateOne({ liveHouseName: liveHouseName },{ status: '上播' }, function(err) {
    TagPlatForm.error(`[Error] Opening MongoDB Error: ${err}`)
  })
});

nms.on('donePublish', (id, StreamPath, args) => {
  const liveHouseName = StreamPath.split('/')[2]
  LiveHouse.updateOne({ liveHouseName: liveHouseName },{ status: '下播' }, function(err) {
    TagPlatForm.error(`[Error] Opening MongoDB Error: ${err}`)
  })
});
