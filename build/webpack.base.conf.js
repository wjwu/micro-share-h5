var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require('glob');
var HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

var src = path.join(__dirname, '..', 'src');

var entryDirs = [];
glob.sync('src/**/index.js').forEach(item => {
  if (item.indexOf('common') < 0) {
    var firstIdx = item.indexOf('/');
    var lastIdx = item.lastIndexOf('/');
    entryDirs.push(item.substr(firstIdx + 1, lastIdx - firstIdx - 1));
  }
});

var entry = {};
var htmlPlugins = [];
var htmlExternals = [];

if (process.env.NODE_ENV !== 'development') {
  htmlExternals.push({
    module: 'wx',
    entry: 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js'
  });
  htmlExternals.push({
    module: 'vue',
    entry: 'http://static.fangzhoubuluo.com/js/vue.min.js'
  });
  htmlExternals.push({
    module: 'axios',
    entry: 'http://static.fangzhoubuluo.com/js/axios.min.js'
  });
}

entryDirs.forEach(item => {
  var entryName = item;
  entry[entryName] = `./src/${item}/index.js`;

  htmlPlugins.push(
    new HtmlWebpackPlugin({
      filename: `${entryName}.html`,
      template: `./src/${item}/index.html`,
      inject: 'body',
      chunks: [entryName]
    })
  );
});

var plugins = [
  new VueLoaderPlugin(),
  new CopyWebpackPlugin([]),
  ...htmlPlugins
];

if (htmlExternals.length > 0) {
  plugins.push(
    new HtmlWebpackExternalsPlugin({
      externals: htmlExternals,
      files: htmlPlugins.map(item => item.options.filename)
    })
  );
}
module.exports = {
  entry,
  module: {
    rules: [
      {
        // enforce: 'pre',
        // test: /\.(js|vue)$/,
        // loader: 'eslint-loader',
        // include: src,
        // options: {
        //   formatter: require('eslint-friendly-formatter')
        // }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [src]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins,
  resolve: {
    extensions: ['.js', '.vue']
  }
};
