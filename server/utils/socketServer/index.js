const io = require('socket.io')

const SocketServer = function(httpServer, options) {
  return io(httpServer, options)
}

module.exports = SocketServer
