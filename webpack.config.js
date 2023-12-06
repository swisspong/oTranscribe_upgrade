const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const devMode = process.env.NODE_ENV !== "production";
module.exports = {
  mode: "development",
  // mode: "production",
  entry: {
    app: "./src/index.js",
    // Runtime code for hot module replacement
    hot: "webpack/hot/dev-server.js",
    // Dev server client for web socket transport, hot and live reload logic
    client: "webpack-dev-server/client/index.js?hot=true&live-reload=true",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    static: "./dist",
    hot: false,
    client: false,
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.json$/,
        type: "json",
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // your options for mini-css-extract-plugin
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      }
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  plugins: [
    // new ExtractTextPlugin("style.css"),,
    // new MiniCssExtractPlugin({
    //   filename: "style.css", // Outputs extracted CSS to a file named "[name].css" (e.g., "app.css")
    // }),
    // new MiniCssExtractPlugin(),
    new MiniCssExtractPlugin({
      // filename: "css/[name][contenthash].css", // CSS files will be saved in the "css" folder with hashed filenames for better caching.
      filename: "style.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.htm",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
      patterns: [
        // {

        //     from: './src/html/',
        //     to: './'
        // }
        {
          from: "./node_modules/webl10n/l10n.js",
        },
      ],
    }),
    // new CleanWebpackPlugin(),
  ],
  optimization: {
    runtimeChunk: "single",
  },
};
