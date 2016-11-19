'use strict';

const express = require('express');

const app = express();

// Default port to 3000 if the environment doesn't have one
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  console.log('Hello!');
});

app.listen(app.get('port'), () => {
  console.log('Listening on port', app.get('port'));
});