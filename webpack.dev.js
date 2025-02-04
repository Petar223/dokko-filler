// webpack.dev.js
const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const configFile = fs.readFileSync(
  path.resolve(process.cwd(), ".env-cmdrc"),
  "utf8",
);
const ENV = JSON.parse(configFile);

const config = (profileName) => {
  const port = process.env.PORT || 3000;
  const basePath = process.env.BASE_PATH || "";
  const server = process.env.HTTPS === "true" ? "https" : "http";
  const publicPath = `${basePath}/`;

  return {
    output: {
      pathinfo: true,
      publicPath,
    },
    devServer: {
      port,
      server,
      compress: true,
      allowedHosts: "all",
      hot: true,
      open: true,
      static: {
        directory: path.resolve(__dirname, "../assets"),
        serveIndex: true,
      },
      historyApiFallback: {
        index: `${basePath}/index.html`,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "X-Frame-Options": "sameorigin",
        "Content-Security-Policy": "frame-ancestors 'self' https://*",
      },
      devMiddleware: {
        publicPath,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
        templateParameters: {
          basePath,
          isProd: false,
          ...ENV[process.env.ENV_NAME],
        },
        inject: true,
      }),
      new ReactRefreshWebpackPlugin({
        overlay: {
          sockPath: `${basePath}/ws`,
        },
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  };
};

module.exports = (env) => config(env);
