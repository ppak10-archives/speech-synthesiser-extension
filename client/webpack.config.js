/**
 * webpack.config.js
 */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv =  require('dotenv');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {

  // https://stackoverflow.com/a/49100966/10521456
  devtool: 'cheap-module-source-map',

  mode: 'development',
  entry: {
    content: {
      import: './src/content',
    },
    background: {
      import: './src/background',
    },
    options: {
      import: './src/options',
    },
    popup: {
      import: './src/popup',
    }
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],

    // Allows for typescript module resolution.
    modules: ['node_modules', 'src'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // Used mainly to copy content script css to dist folder.
    // May look into using something like css-loader if styles get more complex.
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/content/index.css'),
        to: path.resolve(__dirname, 'dist/content.css'),
      }],
    }),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: 'src/popup/index.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      filename: 'options.html',
      template: 'src/options/index.html',
      chunks: ['options']
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
  ]
};
