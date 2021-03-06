var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var ip = require('ip');

const dist = path.join(__dirname, '..', 'dist');

module.exports = merge(baseConfig, {
  output: {
    path: dist,
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(gif|png|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        APP_ID: '"wx78ec611707faf6af"',
        API_HOST: '"http://web.j-coder.com"',
        WEB_HOST: '"http://frp.j-coder.com"',
        IMAGE_HOST: '"http://static.fangzhoubuluo.com"'
      }
    })
  ],
  devServer: {
    disableHostCheck: true,
    host: ip.address()
  }
});
