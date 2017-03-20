var path = require('path');

module.exports = {
  devtool: "inline-source-map",
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  devServer: {
    port: 8080,
    hot: true,
    host: "0.0.0.0",
    historyApiFallback: {
      index: 'index.html'
    }
  }
};
