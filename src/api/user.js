import CONSTANT from '@/constant'
import request from '@/utils/request'
import qs from 'query-string'

function signIn(params) {
  return request({
    url: `/user/auth/token`,
    method: 'post',
    data: qs.stringify(params),
    headers: CONSTANT.FORM_HEADERS,
  })
}

function signUp(params) {
  return request({
    url: `/user/signUp`,
    method: 'post',
    data: qs.stringify(params),
    headers: CONSTANT.FORM_HEADERS,
  })
}

function getRoutesByToken() {
  return request({
    url: `/user/auth/getRoutesByToken`,
    method: 'post',
  })
}

function logout() {
  return request({
    url: `/user/logout`,
    method: 'post',
  })
}

export default {
  signIn,
  getRoutesByToken,
  logout,
  signUp
}
