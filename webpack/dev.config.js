const common = require('./common.config');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    compress: true,
    port: 3412,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
});
