'use strict';

const path = require('path');

module.exports = {
  entry: './app/main.jsx',
  output: {
    path: path.join(__dirname, './js/dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015',
            'react'
          ]
        }
      }
    ]
  }
};
