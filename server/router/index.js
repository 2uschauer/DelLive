'use strict'
const express = require('express')
const router = express.Router()
const { RESULT } = require('../utils/returnJson')
const { TagPlatForm } = require('../utils/log')
const { redisGet } = require('../utils/redis')
module.exports = function() {
  router.use('/user', require('./user')())
  router.use(function(req, res, next) {
    TagPlatForm.info(`[Info] Request [${req.originalUrl}] processing!`)
    const token = req.get('X-Authorization')
    redisGet(token).then((userName) => {
      if (userName) {
        next()
      } else {
        res.json(RESULT.UNAUTHORIZATION)
      }
    }).catch((err) => {
      if (err) TagPlatForm.error(`[Error] Request [${req.originalUrl}] Error: ${err}`)
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
