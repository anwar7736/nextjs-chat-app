const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin: '*'
    }
});

app.get('/', (req, res) => {
    res.send("OK");
  });
  
io.on('connection', (socket) => {
    console.log('a new user connected!');

    socket.on('send-message', (data) => {
        //for sender
        socket.emit('receive-message', data);
        //for receiver
        socket.broadcast.emit('receive-message', data);
      });

    socket.on('disconnect', () => {
        console.log('a user disconnected!');
    });
});

server.listen(3001, () => {
    console.log("Server running at http://localhost:3001");
});
