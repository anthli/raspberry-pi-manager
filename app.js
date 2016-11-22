'use strict';

const express = require('express');
const publicIp = require('public-ip');

const app = express();

// Default port to 3000 if the environment doesn't have one
const port = process.env.PORT || 3000;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  publicIp.v4().then(ip => {
    res.send({
      ip: ip,
      status: 'Running'
    });
  });
});

// Start up the server
app.listen(port, () => {
  console.log('Listening on port', port);
});