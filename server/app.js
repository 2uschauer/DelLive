'use strict'
const express = require('express')
const http = require('http')
const config = require('./config')
const path = require('path')
const returnJson = require('./utils/returnJson')
const logger = require('./utils/log')
const TagPlatForm = logger.TagPlatForm
const app = express()
const spawn = require('child_process').spawn;
const liveServerPath = path.join(__dirname,'../../livego')
function onData(data) {
  process.stdout.write(data);
}
function startLive() {
  const subProcess = spawn('bash');
  subProcess.on('error', function () {
    TagPlatForm.error('Error error is: ', arguments)
  });
  // 设置消息监听
  subProcess.stdout.on('data', onData);
  subProcess.stderr.on('data', onData);
  subProcess.on('close', (code) => { TagPlatForm.info(`Exit process code：${code}`) }); // 监听进程退出
  // 向子进程发送命令
  subProcess.stdin.write(`cd ${liveServerPath} \n`);
  subProcess.stdin.write('./livego \n');
  return subProcess
}
let subProcess = startLive()
app.use('/backend', require('./utils/proxy')(config.ziker.appIntranetPrefix))

if (config.env !== 'env') {
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath'),'index.html'))
    })
}
require('./utils/expressMiddleware')(app)

app.use('/user/auth/token', (req, res) => {
  res.json({
    responseCode: '000000',
    responseMsg: '登陆成功',
    data: '111'
  })
})

app.use('/user/auth/getRoutesByToken', (req, res) => {
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
app.use('/live/restart', function(req, res) {
  try {
    process.kill(subProcess.pid + 1, 'SIGKILL')
    process.kill(subProcess.pid, 'SIGKILL')
    subProcess = startLive()
    res.json({
      responseCode: '000000',
      responseMsg: '重启成功',
      data: null
    })
  } catch (err) {
    res.json({
      responseCode: '000001',
      responseMsg: `${err}`,
      data: null
    })
  }
})
app.use(function(error, req, res, next) {
  TagPlatForm.error('Error error is: ',req.url, error)
  res.json(returnJson.RESULT.SYSTEM_FAIL, 500)
  next()
})
const server = http.createServer(app)
function startServer() {
  server.listen(config.port, function() {
    console.info(`Express server listening on ${config.port}`,`environment is ${process.env.NODE_ENV}`)
  })
}
setImmediate(startServer)
