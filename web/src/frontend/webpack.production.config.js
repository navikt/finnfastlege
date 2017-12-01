var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = '../main/webapp/js';
var mainPath = path.resolve(__dirname, 'js', 'index.js');
var stylesPath = path.resolve(__dirname, 'styles', 'styles.less');

var config = {

  // We change to normal source mapping
  devtool: 'source-map',
  entry: [mainPath, stylesPath],
  output: {
    path: buildPath,
    filename: 'bundle-prod.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ["react", "es2015"]
      },
      exclude: [nodeModulesPath]
    },
        {
            test: /\.less$/,
            loaders: ['style-loader', 'css-loader', 'less-loader?{"globalVars":{"nodeModulesPath":"\'~\'", "coreModulePath":"\'~\'"}}']
        },
        {
            test: /\.json$/,
            loader: 'json'
        },
        {
            test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
            loader: 'url?limit=10000'
        },
        {
            test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
            loader: 'file'
        }]
  },

  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": "'production'"
    })
  ]
};

module.exports = config;