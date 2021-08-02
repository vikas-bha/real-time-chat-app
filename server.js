const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
      //here socket is user and its id is name 
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  //sending the message through the code written bwlow
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    // the swecond par tof the above line is like signifyin which man is messaging you 
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})