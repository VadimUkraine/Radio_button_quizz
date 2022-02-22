const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  devtool: false,
  optimization: {
    minimizer: [new OptimizeCssAssetWebpackPlugin(), new TerserWebpackPlugin()],
  },
  plugins: [new CleanWebpackPlugin(), new BundleAnalyzerPlugin()],
};
