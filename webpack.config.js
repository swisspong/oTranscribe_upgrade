const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const devMode = process.env.NODE_ENV !== "production";
module.exports = {
  mode: "development",
  // mode: "production",
  // entry: "./src/index.js",
  entry: {
    app: "./src/index.js",
    // Runtime code for hot module replacement
    hot: "webpack/hot/dev-server.js",
    // Dev server client for web socket transport, hot and live reload logic
    client: "webpack-dev-server/client/index.js?hot=true&live-reload=true",
  },
  // output: {
  //   path: path.resolve(__dirname, "dist"),
  //   filename: "bundle.js",
  // },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    static: "./dist",
    // hot: true,
    // Dev server client for web socket transport, hot and live reload logic
    hot: false,
    client: false,
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: [
              "@babel/preset-env",
              // "@babel/preset-stage-2"
            ],
            plugins: ["@babel/plugin-transform-react-jsx"],
          },
        },
      },
      // {
      //   test: /\.jsx?$/,
      //   exclude: /(node_modules|bower_components)/,
      //   loader: "babel-loader",
      //   query: {
      //     cacheDirectory: true,
      //     presets: ["es2015", "stage-2"],
      //   },
      // },
      // {
      //   test: /\.scss$/i,
      //   use: ["style-loader", "css-loader","scss-loader"],
      // },
      // {
      //   test: /\.scss$/i,
      //   use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      // },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     // Creates `style` nodes from JS strings
      //     "style-loader",
      //     // Translates CSS into CommonJS
      //     "css-loader",
      //     // Compiles Sass to CSS
      //     "sass-loader",
      //   ],
      // },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "css-loader",
      //       options: {
      //         sourceMap: true,
      //       },
      //     },
      //     {
      //       loader: "sass-loader",
      //       options: {
      //         sourceMap: true,
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     MiniCssExtractPlugin.loader, // Extracts CSS to a separate file
      //     "css-loader", // Transpiles CSS
      //     "sass-loader", // Compiles Sass to CSS
      //   ],
      // },
      {
        test: /\.json$/,
        // use: "json-loader",
        type: "json",
      },
      // {
      //   test: /\.jsx?$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       cacheDirectory: true,
      //       presets: ["@babel/preset-env", "@babel/preset-stage-2"],
      //     },
      //   },
      // },
      // {
      //   test: /\.(s(a|c)ss)$/,
      //   use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      // },
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
    ],
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
