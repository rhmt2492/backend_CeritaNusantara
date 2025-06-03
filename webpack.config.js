
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/scripts/app.js', 
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    open: true,
  },
  
  mode: 'development',
};


// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

// module.exports = {
//   entry: './src/scripts/app.js', 
//   output: {
//     filename: 'main.js',
//     path: path.resolve(__dirname, 'dist'),
//     clean: true,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: ['style-loader', 'css-loader'],
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/index.html',
//     }),
//     new CopyWebpackPlugin({
//       patterns: [
//         { from: 'public', to: '.' }, 
//       ],
//     }),
//   ],
//   devServer: {
//     static: {
//       directory: path.resolve(__dirname, 'public'),
//     },
//     open: true,
//   },
//   mode: 'development',
// };
