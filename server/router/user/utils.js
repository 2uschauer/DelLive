require('promise.prototype.finally').shim();
const moment = require('moment')
const { TagPlatForm } = require('../../utils/log')
const { RESULT } = require('../../utils/returnJson')
const { User, Role, InviteCode } = require('../../utils/mongo')
const { redisSet, redisGet, redisDelete } = require('../../utils/redis')
const { encodePasseord, getToken } = require('../../utils')
const dateFormat = `${moment().format('YYYY-MM-DD HH:mm:ss:SSS')}`
const hanldeSignIn = function(req,res) {
  TagPlatForm.info(`${dateFormat} [Info] Request [${req.originalUrl}] processing!`)
  const params = req.body
  let token = null
  params.password = encodePasseord(params.password)
  User.findOne(params).then((doc) => {
    if (doc) {
      token = getToken(doc.userName)
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
    if (err) TagPlatForm.error(`${dateFormat} [Error] Request [${req.originalUrl}] Error: ${err}`)
    res.json({
      responseCode: '000001',
      responseMsg: err,
      data: err || null
    })
  })
}
const hanldeSignUp = function(req,res) {
  TagPlatForm.info(`${dateFormat} [Info] Request [${req.originalUrl}] processing!`)
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
      token = getToken(params.userName)
      return redisSet(token, params.userName)
    }).then(() => {
      return InviteCode.deleteOne(inviteCode)
    }).then(() => {
      res.json({
        responseCode: '000000',
        responseMsg: '登陆成功',
        data: token
      })
    }).catch((err) => {
      if (err) TagPlatForm.error(`${dateFormat} [Error] Request [${req.originalUrl}] Error: ${err}`)
      res.json({
        responseCode: '000001',
        responseMsg: err,
        data: err || null
      })
    })
  })
}
const getRoutesByToken = function(req,res) {
  TagPlatForm.info(`${dateFormat} [Info] Request [${req.originalUrl}] processing!`)
  const token = req.get('X-Authorization')
  redisGet(token).then((userName) => {
    if (userName) {
      return User.findOne({ userName: userName })
    } else {
      res.json(RESULT.UNAUTHORIZATION)
    }
  }).then((doc) => {
    if (doc) {
      res.json({
        responseCode: '000000',
        responseMsg: '获取菜单列表成功',
        data: doc.router
      })
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
}
const handleLogout = function(req,res) {
  TagPlatForm.info(`${dateFormat} [Info] Request [${req.originalUrl}] processing!`)
  const token = req.get('X-Authorization')
  redisDelete(token).then(() => {
    res.json({
      responseCode: '000000',
      responseMsg: '登出成功！',
      data: null
    })
  }).catch((err) => {
    res.json({
      responseCode: '000001',
      responseMsg: err,
      data: err || null
    })
  })
}
module.exports = {
  hanldeSignIn,
  hanldeSignUp,
  getRoutesByToken,
  handleLogout
}
