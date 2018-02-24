var debug = process.env.NODE_ENV !== "production";
var JavaScriptObfuscator = require('webpack-obfuscator');
var webpack = require('webpack');
var path = require('path');

const config = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/app.jsx",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "app.min.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new JavaScriptObfuscator ({
      rotateUnicodeArray: true
    }, ['excluded_bundle_name.js'])
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true
  },
};

module.exports = config;