'use strict'
const merge = require('webpack-merge');
// const webpackConfig = require('./webpack.config');
const webpackConfig = require('./pack-as-plugin');

module.exports = merge(webpackConfig, {
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,  // 延迟更新
    poll: 1000,  // 轮询间隔
    ignored: [/node_modules/,/examples/],
  },
})
