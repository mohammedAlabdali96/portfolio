const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = [
  {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './build',
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: ['file-loader?name=[name].[ext]&outputhPath=images/&publicPath=images/']
        },
        {
          test: /\.scss$/,
          loader: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve('./index.html')
      }),
      new CopyWebpackPlugin([{
        from: './assets',
        to: 'assets'
      }])
    ]
  }
];
