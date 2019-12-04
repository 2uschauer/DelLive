import io from 'socket.io-client'
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
  const manager = new io.Manager('/',{
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
    console.log('connect')
    socket.trigger('connect')
  })
  socket.on('disconnect', () => {
    console.log('disconnect')
    socket.trigger('disconnect')
  })
  socket.on('logout', () => {
    console.log('logout')
    socket.trigger('logout')
  })
  socket.on('connected', () => {
    console.log('connected')
    socket.trigger('connected')
  })
  socket.on('disconnected', () => {
    console.log('disconnected')
    socket.trigger('disconnected')
  })
  return socket
}
export {
  initSocket
}
