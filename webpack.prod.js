const CompressionWebpackPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// Env vars must be present in the shell/CI environment at build time,
// e.g. `npx env-cmd -e prod npm run build`.
module.exports = () => ({
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].chunk.js',
    publicPath: '/',
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ parallel: true })],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
        },
      },
    },
    runtimeChunk: 'single',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    ...['gzip', 'brotliCompress'].map(
      (algorithm) =>
        new CompressionWebpackPlugin({
          filename: `[path][base].${algorithm === 'gzip' ? 'gz' : 'br'}`,
          algorithm,
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        })
    ),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE ? 'server' : 'disabled',
    }),
  ],
  performance: {
    hints: 'warning',
    maxEntrypointSize: 1024000,
    maxAssetSize: 512000,
  },
});
