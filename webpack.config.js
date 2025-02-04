// webpack.config.js
const path = require("path");
const { merge } = require("webpack-merge");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const developmentConfig = require("./webpack.dev");

const isProd = Boolean(process.env.NODE_ENV === "production");
const isDev = Boolean(process.env.NODE_ENV === "development");

const commonConfig = (env) => {
  return {
    mode: process.env.NODE_ENV,
    bail: isProd,
    context: path.resolve(__dirname, ""),
    devtool: isProd ? "cheap-module-source-map" : "source-map",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      pathinfo: isDev,
      filename: isProd ? "js/[name].[contenthash:8].js" : "js/bundle.js",
      clean: true,
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "entry",
                    corejs: 3,
                    exclude: ["transform-typeof-symbol"],
                  },
                ],
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
              ],
              sourceType: "unambiguous",
              plugins: [
                "@babel/plugin-transform-runtime",
                "babel-plugin-styled-components",
                isDev && "react-refresh/babel",
              ].filter(Boolean),
            },
          },
        },
        {
          test: /\.ico$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|svg)$/iu,
          type: "asset/inline",
        },
        {
          test: /\.css$/u,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: "css-loader" },
          ],
          type: "javascript/auto",
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
      ],
    },
    optimization: {
      emitOnErrors: false,
    },
    resolve: {
      alias: {
        "~components": path.resolve(__dirname, "./src/components"),
        "~shared-components": path.resolve(
          __dirname,
          "./src/shared-components",
        ),
        "~pages": path.resolve(__dirname, "./src/pages"),
        "~hooks": path.resolve(__dirname, "./src/hooks"),
        "~api": path.resolve(__dirname, "./src/api"),
        "~context": path.resolve(__dirname, "./src/context"),
        "~utils": path.resolve(__dirname, "./src/utils"),
      },
      extensions: [".js", ".jsx", ".json"],
      symlinks: true,
    },
    stats: "minimal",
    plugins: [
      new ESLintPlugin({
        quiet: true,
      }),
      new WebpackManifestPlugin(),
      new MiniCssExtractPlugin({
        filename: isDev ? "css/vendors.css" : "css/[name].[contenthash:8].css",
      }),
    ],
  };
};

module.exports = (env) => {
  if (isDev) {
    return merge(commonConfig(env), developmentConfig(env));
  }

  if (isProd) {
    return merge(commonConfig(env), productionConfig(env));
  }

  return commonConfig(env);
};
