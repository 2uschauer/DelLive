const io = require('socket.io')
const moment = require('moment')
const { TagPlatForm } = require('../log')
const dateFormat = `${moment().format('YYYY-MM-DD HH:mm:ss:SSS')}`

const SocketServer = function(httpServer, options) {
  if (!(this instanceof SocketServer)) return new SocketServer(httpServer, options)
  this.socket = io(httpServer, options)
}

SocketServer.prototype.register = function(hanlder = () => {}) {
  this.socket.on('connection', (socket) => {
    TagPlatForm.info(`${dateFormat} [Info]Socket connected`)
    hanlder('connect',socket)
    socket.on('disconnect', function() {
      TagPlatForm.info(`${dateFormat} [Info]Socket disconnected`)
      hanlder('disconnect',socket)
    });
  });
}
module.exports = SocketServer
