const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { merge } = require('webpack-merge');
const alias = require('./aliases');
const { version } = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';

// Only these variables reach the browser bundle. Never expose process.env as
// a whole: it would embed every secret of the build machine.
const PUBLIC_ENV = [
  'API_BASE_URL',
  'READER_API_BASE_URL',
  'CASE_API_KEY',
  'REACT_APP_COGNITO_USER_POOL_ID',
  'REACT_APP_COGNITO_CLIENT_ID',
  'REACT_APP_COGNITO_DOMAIN',
  'REACT_APP_COGNITO_REDIRECT_URLS',
];

const definedEnv = Object.fromEntries(
  PUBLIC_ENV.map((key) => [
    `process.env.${key}`,
    JSON.stringify(process.env[key] ?? ''),
  ])
);

const commonConfig = {
  mode: isProd ? 'production' : 'development',
  bail: isProd,
  context: __dirname,
  devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
  entry: './src/index.js',
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff2?|ttf)$/,
        type: 'asset/resource',
        generator: { filename: 'fonts/[name].[contenthash:8][ext]' },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  optimization: {
    emitOnErrors: false,
  },
  resolve: {
    alias,
    extensions: ['.js', '.jsx', '.json'],
  },
  stats: 'minimal',
  plugins: [
    new webpack.DefinePlugin({
      ...definedEnv,
      'process.env.APP_VERSION': JSON.stringify(version),
    }),
    new ESLintPlugin({ quiet: true }),
    new WebpackManifestPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public/assets', to: 'assets' }],
    }),
  ],
};

module.exports = (env) => {
  // Lazy require: the dev config reads .env-cmdrc, which CI does not have.
  const envConfig = isProd
    ? require('./webpack.prod')(env)
    : require('./webpack.dev')(env);
  return merge(commonConfig, envConfig);
};
