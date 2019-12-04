const { connectRedisPublish, disconnectRedisPublish } = require('./redis')
const { redisSubClient } = require('../../redis')
const handlers = {
  connect: [connectRedisPublish],
  disconnect: [disconnectRedisPublish]
}

exports.handlerRegister = function(socket) {
  socket.use((socket, next) => {
    if (socket.handshake.headers['x-authorization']) next()
    else return next(new Error('authentication error!'))
  })
  redisSubClient.register('disconnectSocket', function(socketId) {
    const allSocket = socket.of('/')
    allSocket.connected[socketId] && allSocket.connected[socketId].emit('logout')
  })
  return function(eventName, ...args) {
    if (handlers[eventName]) {
      handlers[eventName].map((item) => {
        if (typeof item === 'function') item.apply(socket,args)
      })
    }
  }
}
