/**
 * webpack.config.js
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  // https://stackoverflow.com/a/49100966/10521456
  devtool: 'cheap-module-source-map',

  mode: 'development',
  entry: {
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
