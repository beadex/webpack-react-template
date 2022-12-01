const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const aliases = require('./aliases');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const styleLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

module.exports = {
  entry: [path.resolve(__dirname, '../src/index.tsx')],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].bundle.js',
    publicPath: '/',
    chunkFilename: 'js/[name].chunk.js',
    assetModuleFilename: 'static/[hash][ext][query]',
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
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isProduction ? 'css/[name].[contenthash:8].css' : 'css/[name].css',
      chunkFilename: 'css/[name].chunk.css',
    }),
    !isProduction && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: aliases,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: path.resolve(__dirname, '../node_modules/'),
        loader: 'esbuild-loader',
        options: {
          target: 'es2015',
        },
      },
      {
        test: /\.(jsx)$/,
        exclude: path.resolve(__dirname, '../node_modules/'),
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx', // Remove this if you're not using JSX
          target: 'es2015',
        },
      },
      {
        test: /\.ts?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
          target: 'es2015',
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
        },
      },
      {
        test: /\.css?$/,
        use: [
          styleLoader,
          'css-loader',
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'css',
              minify: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|webp)$/,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 10000 } },
      },
    ],
  },
};
