const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
require("@babel/register");

module.exports = {
  entry:  './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      hash: true
    })
  ],
  resolve: {
    extensions: ['.js'],
  },
  devtool: 'source-map'
};