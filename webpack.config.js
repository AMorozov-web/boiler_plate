const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const {extendDefaultPlugins} = require("svgo");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'public'),
    clean: {
      keep: 'index.html',
    },
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
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
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
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["mozjpeg", { quality: 63 }],
          ["optipng", { optimizationLevel: 5 }],
          [
            "svgo",
            {
              plugins: extendDefaultPlugins([
                {
                  name: "removeViewBox",
                  active: false,
                },
                {
                  name: "addAttributesToSVGElement",
                  params: {
                    attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                  },
                },
              ]),
            },
          ],
        ],
      },
    }),
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
