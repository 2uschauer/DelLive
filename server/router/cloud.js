'use strict'
const express = require('express')
const httpProxy = require('http-proxy')
const router = express.Router()
const { cloudPrefix } = require('../config')
const { TagPlatForm } = require('../utils/log')
const zikerProxy = httpProxy.createProxyServer({ cloudPrefix })
const moment = require('moment')
const dateFormat = `${moment().format('YYYY-MM-DD HH:mm:ss:SSS')}`
zikerProxy.on('error',function(error,req,res) {
  TagPlatForm.error(`${dateFormat} [Error]Request Error: ${error}`)
  res.status(520).end()
})

module.exports = function() {
  router.use(function(req,res) {
    TagPlatForm.info(`${dateFormat} [Info] Request processing!`)
    zikerProxy.web(res,req)
  })
  return router
}
