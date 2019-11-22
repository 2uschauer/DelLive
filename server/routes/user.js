'use strict'
module.exports = function() {
  const express = require('express')
  const router = express.Router()
  router.use('/auth/token',function(req, res) {
    res.json({
      responseCode: '000000',
      responseMsg: '登陆成功',
      data: '111'
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
