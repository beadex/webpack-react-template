const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const aliases = require('./aliases');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: ['react-hot-loader/patch', path.resolve(__dirname, '../src/index.tsx')],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].bundle.js',
    publicPath: '/',
    chunkFilename: 'js/[name].chunk.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: aliases,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, '../node_modules/'),
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: path.resolve(__dirname, '../node_modules/'),
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
};
