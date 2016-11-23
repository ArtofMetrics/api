'use strict';
const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const rootDir = __dirname;
/**
 * Resolve paths so that we don't have to use relative paths when importing dependencies.
 * Very helpful when scaling an application and changing the location of a file that my require another file
 * in the same directory as the one it used to be in
 */
const pathResolves = [ path.resolve(rootDir, 'src'), path.resolve(rootDir, 'node_modules') ];

module.exports = {
  entry: path.resolve(rootDir, 'src/client/main.ts'),
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.ts$/, 
        use: ['ts-loader'],
        exclude: [path.resolve(rootDir, 'node_modules')] 
      },
      {
        test: /\.jade$/,
        use: ['pug-ng-html-loader']
      },
      {
        test: /\.styl$/,
        use: [
          { loader: 'raw-loader' },
          { loader: 'stylus-loader' }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.jade', '.styl'],
    modules: pathResolves
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(rootDir, 'src/index.jade')
    }),

    /**
     * Define any environment variables for client
     */
    new webpack.DefinePlugin({
      app: {
        environment: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
      }
    }),
    /**
     * This plugin is required because webpack 2.0 has some issues compiling angular 2.
     * The angular CLI team implemented this quick regexp fix to get around compilation errors
     */
    new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        './'
      )
  ]
};