'use strict'
const path = require('path');
const config = require('./config');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: config.context,
  mode: 'production',
  entry: {
    'simple-zoom': path.resolve(config.context, 'src/index.js')
  },
  output: {
    path: config.assetsRoot,
    filename: '[name].js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'images/[name].[ext]'
        }
      },
    ]
  }
}