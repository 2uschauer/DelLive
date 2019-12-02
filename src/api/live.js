import request from '@/utils/request'
import CONSTANT from '@/constant'
const { BACKEND_URL } = CONSTANT
function getLiveHouse(data) {
  return request({
    url: `${BACKEND_URL}/live/getHouse`,
    method: 'post',
    data
  })
}

function createLiveHouse(data) {
  return request({
    url: `${BACKEND_URL}/live/createHouse`,
    method: 'post',
    data
  })
}

export default {
  getLiveHouse,
  createLiveHouse
}
