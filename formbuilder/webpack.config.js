const webpack = require('webpack');
//const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const env = 'development';

module.exports = {
  devtool: "source-map",
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  //mode:"development",
  entry: __dirname + "/src/js/main.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.js$/,
        include: /node_modules\/react-inputs-validation/,
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: './dist',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              import: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              importLoaders: 1,
              minimize: true
            }
          }
        ],
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.BannerPlugin('Copyright@WSS'),
    new webpack.HotModuleReplacementPlugin(),
    new TerserPlugin({
      parallel: true,
      sourceMap: true,
      terserOptions: {
        ecma: 6,
      },
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles.css'
    })
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
