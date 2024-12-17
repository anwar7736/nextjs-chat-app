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
  
  const users = {}; // To store socket IDs mapped to user IDs

  io.on('connection', (socket) => {
      console.log('A new user connected!', socket.id);
  
      // Store user and their socket ID when they connect
      socket.on('register-user', (userId) => {
          users[userId] = socket.id; // Map userId to the socket ID
          console.log('User registered:', userId, socket.id);
          socket.broadcast.emit('active-users', Object.keys(users));
      });
  
      // Handle private messaging
      socket.on('private-message', (data) => {
          const parsedData = JSON.parse(data);
          const receiverId = parsedData.receiver[0]._id;
  
          // Send message back to the sender
          socket.emit('private-message', parsedData);
  
          // Send message to the receiver
          io.to(users[receiverId]).emit('private-message', parsedData);
      });
  
      // Handle disconnect
      socket.on('disconnect', () => {
          console.log('A user disconnected:', socket.id);
          for (const userId in users) {
              if (users[userId] === socket.id) {
                  delete users[userId]; // Remove disconnected user
                  socket.broadcast.emit('active-users', Object.keys(users));
                  break;
              }
          }
      });
  });
  

server.listen(3001, () => {
    console.log("Server running at http://localhost:3001");
});
