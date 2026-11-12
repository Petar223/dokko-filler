const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Env vars come from .env-cmdrc via `env-cmd -e dev` (see package.json).
module.exports = () => {
  const port = process.env.PORT || 3000;
  const basePath = process.env.BASE_PATH || '';
  const publicPath = `${basePath}/`;

  return {
    output: {
      pathinfo: true,
      publicPath,
    },
    devServer: {
      port,
      server: process.env.HTTPS === 'true' ? 'https' : 'http',
      compress: true,
      hot: true,
      open: true,
      historyApiFallback: {
        index: `${basePath}/index.html`,
      },
      headers: {
        'X-Frame-Options': 'sameorigin',
        'Content-Security-Policy': "frame-ancestors 'self'",
      },
      devMiddleware: {
        publicPath,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
      }),
      new ReactRefreshWebpackPlugin({
        overlay: { sockPath: `${basePath}/ws` },
      }),
    ],
  };
};
