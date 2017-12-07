var path = require('path');
var webpack = require('webpack');

module.exports = {
 entry: './js/playerStats.js',
 output: {
  path: __dirname,
  filename: 'js/bundle.js'
 },
 watch: true,
 module: {
  loaders: [
   {
    test: /.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
     presets: ['es2015', 'react']
    }
   }

  ]
 },
};﻿
