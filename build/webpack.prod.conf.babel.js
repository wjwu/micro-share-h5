import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.base.conf.babel';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const dist = path.join(__dirname, '..', 'dist');

const config = merge(baseConfig, {
  output: {
    path: dist,
    filename: '[name].[hash].js',
    publicPath: '../'
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        ie8: true,
        ecma: 5
      }
    }),
    new CleanWebpackPlugin('./dist', {
      root: path.join(__dirname, '..'),
      verbose: true,
      dry: false
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new CopyWebpackPlugin([
      { from: './config/*.js', to: './vendor' },
      { from: './src/index.html', to: './' }
    ])
  ],
  externals: {
    vue: 'Vue',
    axios: 'axios'
  }
});

export default config;
