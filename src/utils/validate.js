import urlRegx from 'url-regex'
import * as emailRegx from 'email-validator'

export function validateURL(url) {
  return urlRegx({ exact: true, strict: true }).test(url)
}

export function validateProtocol(Protocol) {
  return /^(https?:|mailto:|tel:)/.test(Protocol)
}

export function validateEmail(email) {
  console.log(emailRegx.validate(email))
  return emailRegx.validate(email)
}

export function validateUserName(userName) {
  return /^([a-zA-Z0-9]|[-])/.test(userName)
}
