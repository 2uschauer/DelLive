import live from '@/api/live'

function getLiveHouse(status) {
  const param = Object.assign({}, { status })
  return new Promise((resolve,reject) => {
    live.getLiveHouse(param)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function createLiveHouse(liveHouseName, time, userName) {
  const param = Object.assign({}, { liveHouseName, time, userName })
  return new Promise((resolve,reject) => {
    live.createLiveHouse(param)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  getLiveHouse,
  createLiveHouse
}
