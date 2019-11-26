import request from '@/utils/request'

function signIn(data) {
  return request({
    url: `/user/auth/token`,
    method: 'post',
    data
  })
}

function signUp(data) {
  return request({
    url: `/user/signUp`,
    method: 'post',
    data
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
