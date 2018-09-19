var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require('glob');
var HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

var src = path.join(__dirname, '..', 'src');

var entryDirs = glob.sync('src/**/index.js').map(item => {
  var firstIdx = item.indexOf('/');
  var lastIdx = item.lastIndexOf('/');
  return item.substr(firstIdx + 1, lastIdx - firstIdx - 1);
});

// var entryDirs = ['qa', 'buy'];

var entry = {};
var htmlPlugins = [];
var htmlExternals = [];

if (process.env.NODE_ENV !== 'development') {
  htmlExternals.push({
    module: 'vue',
    entry: 'https://cdn.bootcss.com/vue/2.5.13/vue.runtime.min.js',
    global: 'Vue'
  });
  htmlExternals.push({
    module: 'axios',
    entry: 'https://cdn.bootcss.com/axios/0.17.1/axios.min.js',
    global: 'axios'
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

const plugins = [
  new VueLoaderPlugin(),
  new CopyWebpackPlugin([{ from: './src/index.html', to: './index.html' }]),
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
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        include: src,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
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
