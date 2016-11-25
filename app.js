'use strict';

const express = require('express');
const http = require('http');

const socketIoConfig = require('./utils/socket-io-config');

const app = express();
const server = http.Server(app);

// Default port to 3000 if the environment doesn't have one
const port = process.env.PORT || 3000;

// Server static files
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'public/index.html');
});

// Start up the server
server.listen(port, () => {
  console.log('Listening on port', port);
});

// Configure socket.io
socketIoConfig(server);