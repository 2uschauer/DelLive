import request from '@/utils/request'
import CONSTANT from '@/constant'
const { BACKEND_URL } = CONSTANT

function signIn(data) {
  return request({
    url: `${BACKEND_URL}/user/auth/token`,
    method: 'post',
    data
  })
}

function signUp(data) {
  return request({
    url: `${BACKEND_URL}/user/signUp`,
    method: 'post',
    data
  })
}

function getRoutesByToken() {
  return request({
    url: `${BACKEND_URL}/user/auth/getRoutesByToken`,
    method: 'post',
  })
}

function logout() {
  return request({
    url: `${BACKEND_URL}/user/logout`,
    method: 'post'
  })
}

export default {
  signIn,
  getRoutesByToken,
  logout,
  signUp
}
