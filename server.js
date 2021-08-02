const express = require('express')
const app = express()
const http = require('http').createServer(app)
// create server around express

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
//in the below command we are using middleware of express and the middleware is static 
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)
// since we created the server on the http objcet and we awant all the proceedingss to happen on this server this we have passed this as an object

io.on('connection', (socket) => {
    //moment it gets connected this function will start all its functioning on that socket
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)//sending the message we sent to other serves or people through broadcast , but it won't sent it to us , but we did it on our own through DOM 
    })

})