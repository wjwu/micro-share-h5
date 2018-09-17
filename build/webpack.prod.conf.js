var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var dist = path.join(__dirname, '..', 'dist');

module.exports = merge(baseConfig, {
  output: {
    path: dist,
    filename: '[name].[hash:8].js',
    publicPath: '/'
  },
  plugins: [
    new UglifyJsPlugin({
      parallel: true
    }),
    new CleanWebpackPlugin('./dist', {
      root: path.join(__dirname, '..'),
      verbose: true,
      dry: false
    }),
    new MiniCssExtractPlugin('[name].[hash:8].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        APP_ID: '"wx78ec611707faf6af"',
        API_HOST: '"http://web.j-coder.com"',
        WEB_HOST: '"http://frp.j-coder.com"',
        IMAGE_HOST: '"http://static.fangzhoubuluo.com"'
      }
    })
  ],
  externals: {
    vue: 'Vue',
    axios: 'axios'
  }
});
