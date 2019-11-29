import request from '@/utils/request'

function getLiveHouse() {
  return request({
    url: `/live/getHouse`,
    method: 'post',
  })
}

function createLiveHouse(data) {
  return request({
    url: `/live/createHouse`,
    method: 'post',
    data
  })
}

export default {
  getLiveHouse,
  createLiveHouse
}
