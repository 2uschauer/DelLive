const express = require('express')
const router = express.Router()
const { createLiveHouse, getLiveHouse } = require('./utils')
const config = require('../../config')
module.exports = function() {
  router.use('/createHouse',createLiveHouse)
  router.use('/getHouse',getLiveHouse)
  router.use('/play',require('../../utils/proxy')(config.ziker.appIntranetPrefix))
  return router
}
