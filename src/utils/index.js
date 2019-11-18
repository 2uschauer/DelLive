import CONSTANT from '@/constant'

export function shouldShowErrorMsg(err) {
  const { SESSION_EXPRIE_CODE, SIGN_IN_USERNAME_OR_PASSWORD_FAIL_CODE } = CONSTANT
  return !!(err && err.responseCode !== SESSION_EXPRIE_CODE && err.responseCode !== SIGN_IN_USERNAME_OR_PASSWORD_FAIL_CODE)
}

export function downloadBlobData(blob, name, type) {
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

export function fileReaderPromisefy(file,method) {
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

export function throttle(fun, waitTime, mustRunTime) {
  const body = document.body
  if (!body.classList.contains('disable-hover')) body.classList.add('disable-hover')
  let timeout
  let startTime = new Date()
  return function() {
    const context = this
    const args = arguments
    const curTime = new Date()
    clearTimeout(timeout)
    timeout = null
    if (curTime.getTime() - startTime.getTime() >= mustRunTime) {
      body.classList.remove('disable-hover')
      fun.apply(context, args)
      startTime = curTime
    } else {
      timeout = setTimeout(() => {
        body.classList.remove('disable-hover')
        fun()
      }, waitTime)
    }
  }
}
