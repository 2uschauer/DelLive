'use strict'
module.exports = function(target) {
  const express = require('express')
  const httpProxy = require('http-proxy')
  const { TagPlatForm } = require('../log')
  const router = express.Router()
  const zikerProxy = httpProxy.createProxyServer({
    target,
  })
  zikerProxy.on('error', function(err,req,res) {
    TagPlatForm.error(`Proxy [${req.originalUrl}] Proxy error! error is `, req.originalUrl, err)
    res.status(520).end()
  })
  router.use(function(req, res) {
    TagPlatForm.info(`Proxy [${target}] [${req.originalUrl}] proxy processing!`)
    zikerProxy.web(req, res)
  })
  return router
}
