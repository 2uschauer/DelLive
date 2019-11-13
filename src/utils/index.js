import CONSTANT from '@/constant'

function shouldShowErrorMsg(err) {
  const { SESSION_EXPRIE_CODE, LOGIN_USERNAME_OR_PASSWORD_FAIL_CODE } = CONSTANT
  return !!(err && err.responseCode !== SESSION_EXPRIE_CODE && err.responseCode !== LOGIN_USERNAME_OR_PASSWORD_FAIL_CODE)
}

function downloadBlobData(blob, name, type) {
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob,`${name}.${type}`)
  } else {
    const a = document.createElement('a')
    document.body.appendChild(a)
    const url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = `${name}.${type}`
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  }
}

function fileReaderPromisefy(file,method) {
  return new Promise((resolve,reject) => {
    const fileReader = new FileReader()
    if (fileReader[method]) {
      fileReader[method](file)
      fileReader.onload = () => {
        resolve(fileReader)
      }
      fileReader.onerror = () => {
        reject(fileReader)
      }
    } else {
      reject()
    }
  })
}

export default {
  shouldShowErrorMsg,
  downloadBlobData,
  fileReaderPromisefy
}
