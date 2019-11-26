'use strict'
const { connectMongo, insertOne, find } = require('../utils/mongo')
const RESULT = require('../utils/returnJson').RESULT
// connectMongo()
//   .then((db) => {
//     return insertOne(db, 'documents', { a: 6 })
//   })
//   .then((db) => {
//     return find(db, 'documents', { a: 6 })
//   })
//   .then((res) => {
//     console.log(res)
//   })
module.exports = function() {
  const express = require('express')
  const router = express.Router()
  router.use('/auth/token',function(req, res) {
    const params = req.body
    console.log(params)
    connectMongo()
      .then((db) => {
        return find(db, 'user', params)
      })
      .then((doc) => {
        if (doc) {
          res.json({
            responseCode: '000000',
            responseMsg: '登陆成功',
            data: '111'
          })
        } else {
          console.log(RESULT.SIGN_IN_USERNAME_OR_PASSWORD_FAIL)
          res.json(RESULT.SIGN_IN_USERNAME_OR_PASSWORD_FAIL)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  })
  router.use('/auth/getRoutesByToken', (req, res) => {
    res.json({
      responseCode: '000000',
      responseMsg: '获取菜单列表成功',
      data: [{
        menuCode: 'live',
        children: [{
          menuCode: 'liveIndex',
          children: null
        },{
          menuCode: 'liveList',
          children: null
        },{
          menuCode: 'liveDetail',
          children: null
        }]
      },{
        menuCode: 'blog',
        children: [{
          menuCode: 'blogIndex',
          children: null
        },{
          menuCode: 'blogList',
          children: null
        },{
          menuCode: 'blogDetail',
          children: null
        }]
      }]
    })
  })
  return router
}
