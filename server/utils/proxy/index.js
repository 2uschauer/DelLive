'use strict'
const moment = require('moment')
const express = require('express')
const httpProxy = require('http-proxy')
const { TagPlatForm } = require('../log')
const router = express.Router()
const dateFormat = `${moment().format('YYYY-MM-DD HH:mm:ss:SSS')}`
module.exports = function(target) {
  const zikerProxy = httpProxy.createProxyServer({
    target,
  })
  zikerProxy.on('error', function(err,req,res) {
    TagPlatForm.error(`${dateFormat} Proxy [${req.originalUrl}] Proxy error! error is `, req.originalUrl, err)
    res.status(520).end()
  })
  router.use(function(req, res) {
    TagPlatForm.info(`${dateFormat} Proxy [${target}] [${req.originalUrl}] proxy processing!`)
    zikerProxy.web(req, res)
  })
  return router
}
