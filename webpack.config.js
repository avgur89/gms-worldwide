'use strict';

const webpack        = require('webpack');
const path           = require('path');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {

  // Entry point
  entry: {
    'js/index': './src/js/index',
    'js/index.jquery': './src/js/index.jquery'
  },

  // Output settings
  output: {
    filename: '[name].js'
  },

  // Webpack's plugins
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'js/index.jquery',
      minChunks: Infinity,
    }),
    new WebpackMd5Hash(),

    new webpack.NoEmitOnErrorsPlugin()
  ],

  // Configure module loading (paths, default paths)
  resolve: {
    alias: {
      "SplitText": path.resolve('node_modules', 'gsap/src/uncompressed/until/SplitText.js'),
      "TweenLite": path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
      "TweenMax": path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
      "TimelineLite": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
      "TimelineMax": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
      "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
      "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    },
    extensions: ['.js'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },

  module: {
    // Configure file loaders
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, path.resolve(__dirname, 'src/js/modules/dep')],
        options: {
          presets: ['es2015', 'stage-2']
        }
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?jQuery!expose-loader?$'
      }
    ]
  }
};