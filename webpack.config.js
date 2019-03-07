const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Is the current build a development build
const IS_DEV = process.env.NODE_ENV === "dev";

const dirNode = "node_modules";
const dirApp = path.join(__dirname, "app");
const dirAssets = path.join(__dirname, "assets");

/**
 * Webpack Configuration
 */
module.exports = {
  entry: {
    vendor: ["lodash"],
    bundle: path.join(dirApp, "index")
  },
  resolve: {
    modules: [dirNode, dirApp, dirAssets]
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV
    }),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "views", "index.pug")
    })
  ],
  module: {
    rules: [
      // BABEL
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
        options: {
          compact: true
        }
      },

      {
        test: /\.(woff|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        loader: "url-loader?limit=100000"
      },

      // Pug

      {
        test: /\.pug$/,
        use: ["pug-loader"]
      },

      // STYLES
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: IS_DEV
            }
          }
        ]
      },

      // CSS / SASS
      {
        test: /\.scss/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: IS_DEV
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: IS_DEV,
              includePaths: [dirAssets]
            }
          }
        ]
      },

      // IMAGES
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      }
    ]
  }
};
