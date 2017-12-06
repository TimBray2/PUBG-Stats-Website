var path = require('path');
var webpack = require('webpack');

//entry: file that webpack will transform
var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + "test.html",
  filename: 'test.html',
  inject: 'body'
});

module.exports = {
   entry: __dirname + '/js/toDo.js',
   output: {
      path:'/',
      filename: 'transformed.js',
   },
   devServer: {
      inline: true,
      port: 8080
   },
   module: {
      loaders: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
         }
      ]
   },
   plugins: [HTMLWebpackPluginConfig]
};
