const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminOptipng = require("imagemin-optipng");
const imageminSvgo = require("imagemin-svgo");
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },
  devServer: {
    inline: false,
    contentBase: path.resolve(__dirname, 'public'),
    watchContentBase: true,
    historyApiFallback: true,
    hot: true,
    open: false,
    port: 1337,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                emitFile: false,
              },
            },
          ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                emitFile: false,
              },
            },
          ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/assets/img',
          to: 'img',
        },
        {
          from: 'src/assets/fonts',
          to: 'fonts',
        },
      ],
    }),
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), path.resolve('node_modules')],
    extensions: ['.js', '.jsx']
  },
  devtool: 'eval-source-map',
};
