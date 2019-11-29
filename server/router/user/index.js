const express = require('express')
const router = express.Router()
const { hanldeSignIn, hanldeSignUp, getRoutesByToken } = require('./utils')
module.exports = function() {
  router.use('/auth/token',hanldeSignIn)
  router.use('/signUp', hanldeSignUp)
  router.use('/auth/getRoutesByToken', getRoutesByToken)
  return router
}
