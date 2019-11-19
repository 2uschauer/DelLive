import request from '@/utils/request'

function restartLiveServer() {
  return request({
    url: `/live/restart`,
    method: 'post',
  })
}

export default {
  restartLiveServer
}
