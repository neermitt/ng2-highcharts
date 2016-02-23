'use strict';

var webpack = require('webpack');
var path = require('path');
var srcPath = path.join(__dirname, 'demo');
var production = -1 < process.argv.indexOf('--dist');
console.log('production', production);
var outPath = production ? 'dist' : 'build';
var devtool = production ? 'source-map' : 'eval-source-map';

var config = {
  target: 'web',
  cache: true,
  entry: {
    app: path.join(srcPath, 'bootstrap.ts'),
    common: [
      'angular2/bundles/angular2-polyfills',
      'jquery/dist/jquery',
      'highcharts/highcharts'
    ]
  },
  resolve: {
    root: srcPath,
    extensions: ['', '.js', '.ts'],
    modulesDirectories: ['node_modules'],
    alias: {}
  },
  output: {
    path: path.join(__dirname, 'demo', outPath),
    publicPath: '',
    filename: '[name].js',
    pathInfo: true
  },

  module: {
    noParse: [],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts'
      },
      {test: /\.css$/, loader: 'style!raw'},
      {test: /\.html/, loader: 'html'}
    ]
  },
  ts: {
    configFileName: 'tsconfig.demo.json'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      minChunks: Infinity
    }),
    new webpack.NoErrorsPlugin()
  ],
  debug: true,
  devtool: devtool
};
if (production) {
  // TODO: enable once I figure out how to stop it from erroring on my
  // raw TypeScript imports in the demo app.
  /*config.plugins.push(new webpack.optimize.UglifyJsPlugin({
   mangle: false
   }));*/
  //config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));
}

module.exports = config;
