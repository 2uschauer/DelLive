import urlRegx from 'url-regex'

function validateURL(url) {
  return urlRegx({ exact: true, strict: true }).test(url)
}

function validatePrototol(str) {
  return /^(https?:|mailto:|tel:)/.test(str)
}

export default {
  validateURL,
  validatePrototol
}
