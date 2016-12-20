'use strict';

const path = require('path');

module.exports = {
  content: __dirname,
  entry: './app/main.jsx',
  output: {
    path: path.join(__dirname, './js/dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};