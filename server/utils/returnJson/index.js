'use strict'

const RESULT = {
  SUCCESS: { responseCode: '000000', responseMsg: '请求处理成功' },
  SYSTEM_FAIL: { responseCode: '-100', responseMsg: '系统异常' },
  ARGUMENT_NOT_VALID: { responseCode: '010000', responseMsg: '请求参数异常' },
  SESSION_EXPRIE: { responseCode: '650113', responseMsg: 'session已过期' },
  SIGN_IN_FAIL: { responseCode: '930101', responseMsg: '用户登录失败' },
  SIGN_IN_USERNAME_OR_PASSWORD_FAIL: { responseCode: '930102', responseMsg: '用户名或密码错误' },
  SIGN_IN_VERIFY_CODE_EXPIRE: { responseCode: '930103', responseMsg: '验证码已过期' },
  SIGN_IN_INVATE_CODE_EXPIRE: { responseCode: '930104', responseMsg: '邀请码已过期' },
  SIGN_IN_LOCKED: { responseCode: '930107', responseMsg: '用户账号已锁定，请联系管理员解锁' },
  SIGNATURE_NOT_VAILD: { responseCode: '930201', responseMsg: '签名验证不通过' },
  REQUEST_NOT_VALID: { responseCode: '930202', responseMsg: '请求不符合规范，请确认后再提交' },
  UNAUTHORIZATION: { responseCode: '930401', responseMsg: '访问无权限' },
}

function ReturnJson(msg, data) {
  this.responseCode = msg.responseCode || '000001'
  this.responseMsg = msg.responseMsg || '请求处理失败'
  this.data = data || null
}

function fail(failMsg, data) {
  return new ReturnJson(failMsg, data)
}

function success(data) {
  return new ReturnJson(RESULT.SUCCESS, data)
}

function NodeError(Msg, data) {
  return new ReturnJson({ responseCode: '199999',responseMsg: Msg }, data)
}

exports.RESULT = RESULT
exports.ReturnJson = ReturnJson
exports.fail = fail
exports.success = success
exports.NodeError = NodeError
