'use strict'
const merge = require('webpack-merge');
const config = require('./config');
const webpackConfig = require('./webpack.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(webpackConfig, {
  mode: 'production',
  output: {
    path: config.assetsRoot,
    filename: '[name].js',
    library: 'SimpleZoom',             // 指定类库名,主要用于直接引用的方式(比如script)
    libraryExport: 'default',       // 对外暴露default属性，就可以直接调用default里的属性
    libraryTarget: 'umd',           // 定义打包方式Universal Module Definition,同时支持在CommonJS、AMD和全局变量使用
    globalObject: 'this'            // 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况
  },
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