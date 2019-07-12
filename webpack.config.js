const path = require('path')
const autoprefixer = require('autoprefixer');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const deepExtend = require('deep-extend');

require("@babel/register");

let publicPath;

const devOptions = (isDev) => {
  if (!isDev) return undefined;

  return {
    devtool: 'source-map',
    output: {
      publicPath: '/',
    },
    devServer: {
      historyApiFallback: true,
      port: 5000
    }
  };
};

module.exports = (env, argv) => deepExtend({
  entry:  './src/index.js',
  output: Object.assign({
    path: path.resolve(__dirname, './dist'),
    filename: 'common.js',
    chunkFilename: 'common.[chunkhash].js'
  }, publicPath),

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          filename: "[name].js",
          test: /\.js(x)?$/,
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      { 
        test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 8192
        }
      },
      {
        test: /\.scss$/,
        loader: [
          argv.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              url: true,
              import: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: 'postcss',
              plugins: [
                // See why this isn't working
                autoprefixer(),
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: argv.mode === 'development' ? '[name].css' : '[name].[hash].css',
      chunkFilename: argv.mode === 'development' ? '[id].css' : '[id].[hash].css',
      hmr: argv.mode === 'development'
    })
  ],
  resolve: {
    alias: {
      styles: path.resolve(__dirname, 'src/styles/'),
      components: path.resolve(__dirname, 'src/components/'),
      js: path.resolve(__dirname, 'src/js/'),
      img: path.resolve(__dirname, 'src/img/'),
      widgets: path.resolve(__dirname, 'src/widgets/')
    },
    extensions: ['.js', '.jsx', '.scss'],
  }
}, devOptions(argv.mode === 'development'));