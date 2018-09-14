import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import glob from 'glob';
import HtmlWebpackExternalsPlugin from 'html-webpack-externals-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const src = path.join(__dirname, '..', 'src');

const entryDirs = glob.sync('src/**/index.js').map(item => {
  const firstIdx = item.indexOf('/');
  const lastIdx = item.lastIndexOf('/');
  return item.substr(firstIdx + 1, lastIdx - firstIdx - 1);
});

// const entryDirs = [
//   // 'other/poster/make',
//   // 'other/poster/template'
//   'home'
// ];

const entry = {};
const htmlPlugins = [];
const htmlExternals = [];

if (process.env.NODE_ENV !== 'dev') {
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
  const entryName = item;
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
  new webpack.NoEmitOnErrorsPlugin(),
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

const extractCss = ExtractTextPlugin.extract({
  use: [
    {
      loader: 'css-loader',
      options: {
        minimize: true
      }
    },
    {
      loader: 'postcss-loader'
    }
  ]
});

const extractSass = ExtractTextPlugin.extract({
  use: [
    {
      loader: 'css-loader',
      options: {
        minimize: true
      }
    },
    {
      loader: 'sass-loader'
    },
    {
      loader: 'postcss-loader'
    }
  ]
});

export default {
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
        use: extractCss
      },
      {
        test: /\.scss$/,
        use: extractSass
      },
      {
        test: /\.(gif|png|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[hash:8].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng: {
              //   enabled: true,
              // },
              pngquant: {
                quality: '65-90',
                speed: 1
              },
              gifsicle: {
                interlaced: false
              }
            }
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
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.vue']
  }
};
