const path = require('path');

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, 'src/index.jsx')],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'myBundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js[x])$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-0']
        }
      },
      {
        test: /\.(mov|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(css)$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
