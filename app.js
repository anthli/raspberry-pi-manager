'use strict';

const express = require('express');

const app = express();

// Default port to 3000 if the environment doesn't have one
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  console.log('Hello!');
});

// Start up the server
app.listen(port, () => {
  console.log('Listening on port', port);
});