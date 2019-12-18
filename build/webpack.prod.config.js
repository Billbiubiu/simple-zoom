'use strict'
const merge = require('webpack-merge');
const webpackConfig = require('./pack-as-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(webpackConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: true,
      parallel: true
    }),
    new ExtractTextPlugin({
      filename: 'simple-zoom.css',
      allChunks: true,
    }),
  ]
})