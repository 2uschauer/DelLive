import live from '@/api/live'

function restartLiveServer() {
  return new Promise((resolve,reject) => {
    live.restartLiveServer()
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  restartLiveServer
}
