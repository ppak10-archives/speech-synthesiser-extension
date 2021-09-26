/**
 * webpack.config.js
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    background: {
      import: './src/background',
      filename: 'background.js',
    },
    options: {
      import: './src/options',
      filename: 'options.js',
    },
    popup: {
      import: './src/popup',
      filename: 'popup.js',
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?S/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: 'src/popup/index.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      filename: 'options.html',
      template: 'src/options/index.html',
      chunks: ['options']
    })
  ]
};
