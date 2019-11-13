'use strict'

const RESULT = {
  SUCCESS: { resultCode: '000000', resultMsg: '请求处理成功' },
  SYSTEM_FAIL: { resultCode: '-100', resultMsg: '系统异常' },
  ARGUMENT_NOT_VALID: { resultCode: '010000', resultMsg: '请求参数异常' },
  SESSION_EXPRIE: { resultCode: '650113', resultMsg: 'session已过期' },
  LOGIN_FAIL: { resultCode: '930101', resultMsg: '用户登录失败' },
  LOGIN_USERNAME_OR_PASSWORD_FAIL: { resultCode: '930102', resultMsg: '用户名或密码错误' },
  LOGIN_VERIFY_CODE_EXPIRE: { resultCode: '930103', resultMsg: '验证码已过期' },
  LOGIN_LOCKED: { resultCode: '930107', resultMsg: '用户账号已锁定，请联系管理员解锁' },
  SIGNATURE_NOT_VAILD: { resultCode: '930201', resultMsg: '签名验证不通过' },
  REQUEST_NOT_VALID: { resultCode: '930202', resultMsg: '请求不符合规范，请确认后再提交' },
  UNAUTHORIZATION: { resultCode: '930401', resultMsg: '访问无权限' },
}

function ReturnJson(msg, data) {
  this.resultCode = msg.resultCode || '000001'
  this.resultMsg = msg.resultMsg || '请求处理失败'
  this.data = data || null
}

function fail(failMsg, data) {
  return new ReturnJson(failMsg, data)
}

function success(data) {
  return new ReturnJson(RESULT.SUCCESS, data)
}

function NodeError(Msg, data) {
  return new ReturnJson({ resultCode: '199999',resultMsg: Msg }, data)
}

exports.RESULT = RESULT
exports.ReturnJson = ReturnJson
exports.fail = fail
exports.success = success
exports.NodeError = NodeError
