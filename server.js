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

  const users = {};

  io.on('connection', (socket) => {
      socket.on('register-user', (userId) => {
          users[userId] = socket.id;
          socket.emit('active-users', Object.keys(users));
          socket.broadcast.emit('active-users', Object.keys(users));
      });

      socket.on('new-user', (data) => {
          socket.broadcast.emit('new-user', data);
      });

      socket.on('user-logout', (userId) => {
          delete users[userId];
          socket.broadcast.emit('active-users', Object.keys(users));
      });
  
      socket.on('private-message', (data) => {
          const parsedData = JSON.parse(data);
          const receiverId = parsedData.receiver[0]._id;
  
          socket.emit('private-message', parsedData);
          io.to(users[receiverId]).emit('private-message', parsedData);
      });

      socket.on('disconnect', () => {
          for (const userId in users) {
              if (users[userId] === socket.id) {
                  delete users[userId];
                  socket.broadcast.emit('active-users', Object.keys(users));
                  break;
              }
          }
      });
  });
  

server.listen(3001);
