'use strict';
const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootDir = __dirname;
/**
 * Resolve paths so that we don't have to use relative paths when importing dependencies.
 * Very helpful when scaling an application and changing the location of a file that my require another file
 * in the same directory as the one it used to be in
 */
const pathResolves = [path.resolve(rootDir, 'src'), path.resolve(rootDir, 'node_modules')];
console.log('path', path.resolve(rootDir, 'src/server'));
module.exports = {
  entry: {
    'app': path.resolve(rootDir, 'src/client/main.ts'),
    'polyfills': [
      'core-js/es6',
      'core-js/es7/reflect',
      'zone.js/dist/zone'
    ]
  },
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.component.ts$/,
        use: [
          {
            loader: 'angular2-template-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              configFileName: path.resolve(rootDir, 'src/client/tsconfig.json')
            }
          }],
        include: [path.resolve(rootDir, 'src/client')]
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFileName: path.resolve(rootDir, 'src/client/tsconfig.json')
            }
          }
        ],
        exclude: /\.component.ts$/
      },
      {
        test: /\.jade$/,
        use: ['pug-ng-html-loader']
      },
      {
        test: /\.styl$/,
        use: [
          'raw-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: path.resolve('src/client'),
        loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader'})
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.jade', '.styl', '.css'],
    modules: pathResolves
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'polyfills'
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(rootDir, 'src/index.jade')
    }),

    /**
     * Define any environment variables for client
     */
    new webpack.DefinePlugin({
      APP_ENV: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
    }),
    /**
     * This plugin is required because webpack 2.0 has some issues compiling angular 2.
     * The angular CLI team implemented this quick regexp fix to get around compilation errors
     */
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      './'
    ),
    new ExtractTextPlugin('[name].css'),
    new WebpackShellPlugin({
      onBuildStart: 'rm -rf ./dist'
    })
  ],
  devServer: {
    historyApiFallback: true
  }
};