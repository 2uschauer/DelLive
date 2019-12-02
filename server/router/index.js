'use strict'
const express = require('express')
const moment = require('moment')
const router = express.Router()
const { RESULT } = require('../utils/returnJson')
const { TagPlatForm } = require('../utils/log')
const { redisGet } = require('../utils/redis')
const dateFormat = `${moment().format('YYYY-MM-DD HH:mm:ss:SSS')}`
module.exports = function() {
  router.use('/user', require('./user')())
  router.use(function(req, res, next) {
    TagPlatForm.info(`${dateFormat} [Info] Request [${req.originalUrl}] processing!`)
    const token = req.get('X-Authorization')
    redisGet(token).then((userName) => {
      if (userName) {
        next()
      } else {
        res.json(RESULT.UNAUTHORIZATION)
      }
    }).catch((err) => {
      if (err) TagPlatForm.error(`${dateFormat} [Error] Request [${req.originalUrl}] Error: ${err}`)
      res.json({
        responseCode: '000001',
        responseMsg: err,
        data: err || null
      })
    })
  })
  router.use('/live',require('./live')())
  return router
}
