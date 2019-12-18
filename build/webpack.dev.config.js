'use strict'
const merge = require('webpack-merge');
const webpackConfig = require('./pack-as-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new ExtractTextPlugin({
      filename: 'simple-zoom.css',
      allChunks: true,
    }),
  ]
})