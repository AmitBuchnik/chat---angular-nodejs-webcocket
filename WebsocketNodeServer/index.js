// var express = require('express');
// var socket = require('socket.io');

// // App setup
// var app = express();
// var server = app.listen(3001, function () {
//   console.log('listening for requests on port 3001');
// });

// // Socket setup
// var io = socket(server);

// // Listen for new connection and print a message in console 
// io.on('connection', (socket) => {

//   console.log(`New connection ${socket.id}`)

//   // Listening for chat event
//   socket.on('chat', function (data) {
//     console.log('chat event trigged at server');
//     console.log('need to notify all the clients about this event');
//     io.sockets.emit('chat', data);
//   });

//   //   // Listening for typing event
//   //   socket.on('typing', function (data) {
//   //     // console.log(`Server received ${data} is typing`);
//   //     // console.log('need to inform all the clients about this');
//   //     io.sockets.emit('typing', data);
//   //     //socket.broadcast.emit('typing', data);
//   //   });
// });

const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4222'],
    methods: ["GET", "POST"]
  }
});

app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

var picturesFilePath = path.join(__dirname, 'pictures.json');
var url = require('url');

// app.get('/api/pictures', (req, res) => {
//   const file = fs.readFileSync(picturesFilePath);
//   res.send(JSON.parse(file.toString()));
// });

app.get('/api/pictures/:id', (req, res) => {
  const file = fs.readFileSync(picturesFilePath);
  const data = JSON.parse(file.toString());
  const picture = data.find(d => d.id === +req.params.id);
  res.send(picture);
});

app.get('/api/pictures', (req, res) => {
  const file = fs.readFileSync(picturesFilePath);
  const query = req.query;
  const data = JSON.parse(file.toString());
  const search = req.query.search ? req.query.search : '';

  const pictures = data.filter(d => d.name.toLocaleLowerCase().includes(search) ||
    d.artistName.toLocaleLowerCase().includes(search));
  res.send(pictures);
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat', (message) => {
    // console.log('chat event trigged at server');
    // console.log('need to notify all the clients about this event');
    io.emit('chat', message);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
