import devConfig from './dev'
import prodConfig from './prod'
import { merge } from 'lodash-es'
const all = {
  env: process.env.NODE_ENV,
  SERVICE_PATH: process.env.SERVICE_PATH,
  BACKEND_URL: '/api',
  SUCCESS_CODE: '000000',
  ERROR_CODE: '000001',
  SYSTEM_FAIL_CODE: '-100',
  SESSION_EXPRIE_CODE: '650113',
  SIGN_IN_FAIL_CODE: '930101',
  SIGN_IN_USERNAME_OR_PASSWORD_FAIL_CODE: '930102',
  SIGN_IN_VERIFY_CODE_EXPIRE_CODE: '930103',
  SIGN_IN_LOCKED_CODE: '930107',
  SIGNATURE_NOT_VAILD_CODE: '930201',
  REQUEST_NOT_VALID_CODE: '930202',
  UNAUTHORIZATION_CODE_CODE: '930401',
  NOT_AUTH: 401,
  FORM_HEADERS: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  FORM_DATA_HEADERS: {
    'Content-type': 'multipart/form-data'
  }
}

const allEnvConfig = {
  dev: devConfig,
  prod: prodConfig
}

const envConfig = allEnvConfig[all.env]
const config = merge(all,envConfig)
export default config
