import store from '@/store'
import router from '@/router'
import CONSTANT from '@/constant'
import sessionHandler from './sessionHandler'

function getUserInfo() {
  return sessionHandler.getItem('userInfo')
}

function setUserInfo(userInfo) {
  sessionHandler.setItem('userInfo',userInfo)
}

function clearAllInfo() {
  sessionStorage.clear()
}

function logout() {
  store.dispatch('logout').then(() => {
    router.push({ path: '/login' })
    window.location.reload()
  })
}

function checkAuth(err) {
  return (err && err.responseCode === CONSTANT.SESSION_EXPRIE_CODE)
}

export default {
  getUserInfo,
  setUserInfo,
  clearAllInfo,
  logout,
  checkAuth
}
