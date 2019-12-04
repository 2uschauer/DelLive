const { redisGet, redisSet, redisDelete, redisPubClient } = require('../../redis')
const moment = require('moment')
const { TagPlatForm } = require('../../log')
const dateFormat = `${moment().format('YYYY-MM-DD HH:mm:ss:SSS')}`
// const data = ['userName', doc.userName, 'socketId', null]
const connectRedisPublish = function(socket) {
  const token = socket.handshake.headers['x-authorization']
  let userName = null
  redisGet(token).then((data) => {
    userName = data
    return redisGet(userName)
  }).then((socketId) => {
    if (socketId) {
      if (socketId === socket.id) return Promise.resolve()
      else {
        redisSet(userName, socket.id)
        return redisPubClient.publish('disconnectSocket', socketId)
      }
    } else {
      return redisSet(userName, socket.id)
    }
  }).then(() => {
    socket.emit('connected')
  }).catch((err) => {
    if (err) TagPlatForm.error(`${dateFormat} [Error] Socket Connect Error: ${err}`)
    else TagPlatForm.error(`${dateFormat} [Error] Socket Connect Error`)
  })
}

const disconnectRedisPublish = function(socket) {
  const token = socket.handshake.headers['x-authorization']
  let userName = null
  redisGet(token).then((data) => {
    userName = data
    return redisGet(userName)
  }).then((socketId) => {
    if (socketId) {
      if (socketId === socket.id) {
        redisDelete(userName)
      } else Promise.resolve()
    } else {
      return Promise.resolve()
    }
  }).then(() => {
    socket.emit('disconnected')
  }).catch((err) => {
    if (err) TagPlatForm.error(`${dateFormat} [Error] Socket Disconnect Error: ${err}`)
    else TagPlatForm.error(`${dateFormat} [Error] Socket Disconnect Error`)
  })
}

module.exports = {
  connectRedisPublish,
  disconnectRedisPublish
}

