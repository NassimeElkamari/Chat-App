const { log } = require('console');
const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin , getCurrentUser , getRoomUsers , userLeave} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname , 'public')));

const botName = 'ChatBot' ;


// Set up the list of available rooms
const availableRooms = ["Room 1", "Room 2", "Room 3"];

// Serve the list of available rooms when requested
app.get('/rooms', (req, res) => {
    res.json({ rooms: availableRooms });
});
// run when client connects
io.on('connection' , (socket) =>{
    socket.emit('roomList', { rooms: availableRooms });
    

    socket.on('joinRoom' , ({username , room}) =>{
        const user = userJoin(socket.id , username , room);

        socket.join(user.room);

        // Welcome current user
        socket.emit('message' , formatMessage(botName , 'Welcome to Chat!'));

        // Broadcaast when a user connects
        socket.broadcast
        .to(user.room)
        .emit('message' , formatMessage(botName , `${user.username} has joined the chat !`));

        // Send users and room info
        io.to(user.room).emit('roomUsers' , {
            room: user.room ,
            users: getRoomUsers(user.room)
        })

    })

    // Runs when client disconnects
    socket.on('disconnect' , ()=> {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit('message' ,formatMessage(botName , `${user.username} has left the chat !`))
            // Send users and room info
            io.to(user.room).emit('roomUsers' , {
            room: user.room ,
            users: getRoomUsers(user.room)
        })
        }
    })

            // Listen for chatMessage
        socket.on('chatMessage', (msg) => {
            const user = getCurrentUser(socket.id);
            io.to(user.room).emit('message', formatMessage(user.username, msg));
        });
})

io.on('error', error => {
    console.error('Socket.IO error:', error);
});

const port = process.env.PORT || 3000;

const hostname1 = '192.168.4.66'
const hostname2 = 'localhost'

server.listen(port , hostname1,()=> {
    console.log(`Server running at http://${hostname1}:${port}`);
});















