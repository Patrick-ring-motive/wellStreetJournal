const webpack = require('webpack');
const path = require('path');

const config = {
  entry: '/alt/js/src/altIndex.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'allIndex.min.js'
  }
};

module.exports = config;