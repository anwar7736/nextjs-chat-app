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

    socket.emit('server-message', 'Message send from server');
    socket.on('client-message', (data) => {
        console.log(data);
      });

    socket.on('disconnect', () => {
        console.log('a user disconnected!');
    });
});

server.listen(3001, () => {
    console.log("Server running at http://localhost:3001");
});
