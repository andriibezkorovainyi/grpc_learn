const io = require('socket.io-client');
const socket = io('http://localhost:3000/chat'); // Replace with your server's URL
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('message', (data) => {
    console.log('Received message:', data);
});

socket.emit('sendMessage', 'Hello, server!');

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('error', (err) => {
    console.error(err);
});
