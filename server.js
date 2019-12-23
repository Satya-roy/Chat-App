console.log("Socket Server is working");
const io = require('socket.io')(5000)

const user = {}

io.on('connection',(socket)=>{
    socket.on('new-User',name=>{
        user[socket.id] = name
        socket.broadcast.emit('user-connection',name)
    })
    socket.on('send-chat-message',(message)=>{
        socket.broadcast.emit('chat-message',{message:message , name : user[socket.id]})
    })
    socket.on('disconnect',()=>{
        
        socket.broadcast.emit('user-disconnected',user[socket.id])
        delete user[socket.id]
    })
})