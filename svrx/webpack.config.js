'use strict'
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack');
const webpackConfig = require('../build/pack-as-plugin');

module.exports = () => {
  return new Promise((resolve, reject) => {
    const spinner = ora('building...').start();

    rm(webpackConfig.output.path, (error) => {
      if (error) reject(error)
      webpack(webpackConfig, (error, stats) => {
        spinner.stop();
        if (error) reject(error)
        else resolve();
        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
          chunks: false,
          chunkModules: false
        }) + '\n\n')
      
        if (stats.hasErrors()) {
          console.log(chalk.red('  Build failed with errors.\n'))
          process.exit(1)
        }
        
        console.log(chalk.cyan('Build completed.'));
      })
    })
  })
}