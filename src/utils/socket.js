import io from 'socket.io-client'
import CONSTANT from '@/constant'
const { Protocol, Host, Port } = CONSTANT
const socketEventQueue = {}
const decorateSocket = function (socket) {
  socket.register = (event, fn) => {
    if (!socketEventQueue[event]) socketEventQueue[event] = []
    socketEventQueue[event].push(fn)
  }
  socket.trigger = (event, ...args) => {
    const handlers = socketEventQueue[event] || []
    for (let i = 0; i < handlers.length; ++i) {
      if (typeof handlers[i] === 'function') handlers[i](args)
    }
  }
  return socket
}
const initSocket = function(token) {
  const manager = new io.Manager(`${Protocol}://${Host}:${Port}`,{
    path: '/socket',
    reconnectionAttempts: 10,
    reconnectionDelay: 3000,
    transportOptions: {
      polling: {
        extraHeaders: {
          'X-Authorization': token
        }
      }
    }
  })
  const socket = decorateSocket(manager.socket('/'))
  socket.on('connect', () => {
    socket.trigger('connect')
  })
  socket.on('disconnect', () => {
    socket.trigger('disconnect')
  })
  socket.on('logout', () => {
    socket.trigger('logout')
  })
  socket.on('connected', () => {
    socket.trigger('connected')
  })
  socket.on('disconnected', () => {
    socket.trigger('disconnected')
  })
  return socket
}
export {
  initSocket
}
