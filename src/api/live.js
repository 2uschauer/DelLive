import request from '@/utils/request'

function restartLiveServer() {
  return request({
    url: `/restart/live`,
    method: 'post',
  })
}

export default {
  restartLiveServer
}
