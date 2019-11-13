import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import CONSTATNT from '@/constant'
import auth from './auth'
import { fileReaderPromisefy as fileReader } from './index'

const service = axios.create({
  baseURL: CONSTATNT.BASE_URL,
  timeout: 45000,
  headers: {
    'Content-Type': 'application/JSON',
    'X-Request-With': 'XMLHttpRequest'
  },
})
service.interceptors.request.use(
  config => {
    const token = store.getters.token
    if (token) config.headers['X-Authorization'] = token
    return config
  }
)
service.interceptors.response.use(
  (response) => {
    const res = response.data
    const { responseCode } = res
    if (!responseCode) return res
    if (responseCode === CONSTATNT.SUCCESS_CODE) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
  async (error) => {
    if (error && error.response) {
      const { response } = error
      const data = await handleErrorData(response)
      if (data && data.responseCode === CONSTATNT.LOGIN_USERNAME_OR_PASSWORD_FAIL_CODE) {
        Message.warning(`${data.responseMsg}`)
      } else if (auth.checkAuth(data)) {
        Message.warning('登录超时，请重新登录！')
        auth.logout()
      }
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error)
  }
)

function handleErrorData({ data }) {
  return new Promise((resolve) => {
    function parseString(str) {
      let res = null
      try {
        res = JSON.parse(str)
      } catch (e) {
        console.log(`[Error]-[JSON.parse()] error: ${e} rawData: ${data}`)
        res = {}
      }
      return res
    }
    if (data && data instanceof Blob) {
      fileReader(data,'readAsText')
        .then((fileReader) => {
          return fileReader.result
        })
        .then((res) => {
          resolve(parseString(res))
        })
    } else {
      resolve(data)
    }
  })
}
export default service
