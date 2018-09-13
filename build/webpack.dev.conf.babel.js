import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.base.conf.babel';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin';

const dist = path.join(__dirname, '..', 'dist');

export default merge(baseConfig, {
  output: {
    path: dist,
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin({
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
    disableHostCheck: true
  }
});
