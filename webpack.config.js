var path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: './app/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['es2015', {modules: false}]],
          plugins: [
            'syntax-dynamic-import',
            'transform-export-extensions',
            'transform-async-to-generator',
            'transform-regenerator',
            'transform-runtime'
          ]
        }
      }]
    }]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'lib'),
      'node_modules'
    ]
  },
  devServer: {
    port: 8080,
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: {
      index: 'index.html'
    }
  }
};
