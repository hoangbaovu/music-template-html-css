const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpackConfig = require("./webpack.config");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(webpackConfig, {
  devtool: "source-map",

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[chunkhash].js"
  },

  plugins: [
    new CleanWebpackPlugin(["dist"]),

    new CopyWebpackPlugin([{ from: "assets", to: "assets" }])
  ]
});
