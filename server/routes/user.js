'use strict'
require('promise.prototype.finally').shim();
const jwt = require('jwt-simple');
const redis = require('redis')
const { MongoClient } = require('mongodb');
const { promisify } = require('util');
const { TagPlatForm } = require('../utils/log')
const { RESULT } = require('../utils/returnJson')
const { find, insertOne, deleteOne } = require('../utils/mongo')
const { encodePasseord } = require('../utils')
const config = require('../config')
const { mongo } = config
const redisClient = redis.createClient(9882, '127.0.0.1')
redisClient.on('error', (err) => { TagPlatForm.error(`${err}`) });
const redisGet = promisify(redisClient.get).bind(redisClient);
const redisSet = promisify(redisClient.set).bind(redisClient);
const secret = 'DieLive';
const url = `mongodb://${mongo.userName}:${mongo.password}@${mongo.url}:${mongo.port}/${mongo.db}`
module.exports = function() {
  const express = require('express')
  const router = express.Router()
  router.use('/auth/token',function(req, res) {
    const params = req.body
    params.password = encodePasseord(params.password)
    MongoClient.connect(url, function(err, mongoclient) {
      if (err) TagPlatForm.error(`${err}`)
      const db = mongoclient.db(mongo.db);
      let token = null
      find(db, 'user', params).then((doc) => {
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
      }).finally(() => {
        mongoclient.close()
      })
    })
  })
  router.use('/signUp', (req, res) => {
    const params = req.body
    params.password = encodePasseord(params.password)
    let token = null
    let inviteCode = null
    MongoClient.connect(url, function(err, mongoclient) {
      if (err) TagPlatForm.error(`${err}`)
      const db = mongoclient.db(mongo.db);
      find(db, 'InviteCode', { code: params.inviteCode }).then((doc) => {
        inviteCode = doc
        if (doc) {
          return find(db, 'role', { role: doc.role })
        } else {
          res.json(RESULT.SIGN_IN_INVATE_CODE_EXPIRE)
        }
      }).then((doc) => {
        return insertOne(db, 'user', {
          userName: params.userName,
          password: params.password,
          email: params.email,
          router: doc.router
        }).then(() => {
          token = jwt.encode(params.userName, secret , 'HS512')
          return redisSet(token, params.userName)
        }).then(() => {
          return deleteOne(db, 'inviteCode', inviteCode)
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
        }).finally(() => {
          mongoclient.close()
        })
      })
    })
  })
  router.use('/auth/getRoutesByToken', (req, res) => {
    const token = req.get('X-Authorization')
    redisGet(token)
      .then((userName) => {
        if (userName) {
          MongoClient.connect(url, function(err, mongoclient) {
            if (err) TagPlatForm.error(`${err}`)
            const db = mongoclient.db(mongo.db);
            find(db, 'user', { userName: userName })
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
          })
        }
      })
  })
  return router
}
