const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "[name].js", // filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    // publicPath: "/todo-list/",
  },
  module: {
    rules: [
      {
        test: /^((?!\.module).)*css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: false,
            },
          },
        ],
      },
      {
        test: /\.module.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]",
              },
            },
          },
        ],
      },
      {
        test: /\.ts?$/,
        include: path.resolve("src"),
        use: "ts-loader",
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["src", "node_modules"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Todo-list app",
      template: "./src/index.html",
    }),
    new HtmlWebpackPlugin({
      title: "Todo-list app - 404",
      template: "./src/404.html",
      filename: "404.html",
    }),
  ],
  devtool: "eval-source-map",
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
