const express = require('express');
const app = express();
const http = require('http');

const port = process.env.PORT || 3000;

//Server Setup
const httpServer = http.createServer(app);
httpServer.listen(port, () => {
    console.log(`App started on port: ${port}`);
})

//Middlewares
app.use(express.static(__dirname + "/public"));


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

//Socket

const io = require('socket.io')(httpServer);

io.on('connection', (socket) => {
    console.log('Connected...');

    socket.on('userPayload', (payload) => {
        socket.broadcast.emit('payloadBroadcast', payload);
    });

    socket.on('userJoined', (name) => {
        socket.broadcast.emit('userJoined', name);
    })
})