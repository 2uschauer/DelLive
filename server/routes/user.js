'use strict'
require('promise.prototype.finally').shim();
const jwt = require('jwt-simple');
const redis = require('redis')
const { promisify } = require('util');
const { TagPlatForm } = require('../utils/log')
const { RESULT } = require('../utils/returnJson')
const { User, Role, InviteCode } = require('../utils/mongo')
const { encodePasseord } = require('../utils')
const redisClient = redis.createClient(9882, '127.0.0.1')
redisClient.on('error', (err) => { TagPlatForm.error(`${err}`) });
const redisGet = promisify(redisClient.get).bind(redisClient);
const redisSet = promisify(redisClient.set).bind(redisClient);
const secret = 'DieLive';
module.exports = function() {
  const express = require('express')
  const router = express.Router()
  router.use('/auth/token',function(req, res) {
    const params = req.body
    let token = null
    params.password = encodePasseord(params.password)
    User.findOne(params).then((doc) => {
      if (doc) {
        token = jwt.encode(doc, secret , 'HS512')
        return redisSet(token, doc.userName)
      } else {
        res.json(RESULT.SIGN_IN_USERNAME_OR_PASSWORD_FAIL)
      }
    }).then(() => {
      res.json({
        responseCode: '000000',
        responseMsg: '登陆成功',
        data: token
      })
    }).catch((err) => {
      console.error(err)
    })
  })
  router.use('/signUp', (req, res) => {
    const params = req.body
    params.password = encodePasseord(params.password)
    let token = null
    let inviteCode = null
    User.find({
      userName: params.userName
    }).then((docs) => {
      if (docs.length === 0) return User.find({ email: params.email })
      else res.json(RESULT.SIGN_UP_USER_EXISTED)
    }).then((docs) => {
      if (docs.length === 0) return InviteCode.findOne({ code: params.inviteCode })
      else res.json(RESULT.SIGN_UP_EMIAL_EXISTED)
    }).then((doc) => {
      inviteCode = doc
      if (doc) {
        return Role.findOne({ role: doc.role })
      } else {
        res.json(RESULT.SIGN_IN_INVATE_CODE_EXPIRE)
      }
    }).then((doc) => {
      console.log(doc.router,'router')
      return User.bulkWrite([{
        insertOne: {
          document: {
            userName: params.userName,
            password: params.password,
            email: params.email,
            router: doc.router
          }
        }
      }]).then(() => {
        token = jwt.encode(params.userName, secret , 'HS512')
        return redisSet(token, params.userName)
      }).then(() => {
        return InviteCode.deleteOne(inviteCode)
      }).then((doc) => {
        res.json({
          responseCode: '000000',
          responseMsg: '登陆成功',
          data: token
        })
      }).catch((err) => {
        res.json({
          responseCode: '000001',
          responseMsg: err,
          data: err
        })
      })
    })
  })
  router.use('/auth/getRoutesByToken', (req, res) => {
    const token = req.get('X-Authorization')
    redisGet(token)
      .then((userName) => {
        if (userName) {
          User.findOne({ userName: userName })
            .then((doc) => {
              if (doc) {
                res.json({
                  responseCode: '000000',
                  responseMsg: '获取菜单列表成功',
                  data: doc.router
                })
              } else {
                res.json(RESULT.UNAUTHORIZATION)
              }
            })
        }
      })
  })
  return router
}
