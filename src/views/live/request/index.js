import live from '@/api/live'

function getLiveHouse() {
  return new Promise((resolve,reject) => {
    live.getLiveHouse()
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
