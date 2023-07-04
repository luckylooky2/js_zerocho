const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = {
  name: 'human-js-engine',
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  entry: {
    app: './client',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['last 2 chrome versions', '> 5% in KR'] },
                debug: true,
              },
            ],
            '@babel/preset-react',
          ],
          plugins: ['react-refresh/babel'],
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
    ],
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true }), new ReactRefreshWebpackPlugin()],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
  },
  devServer: {
    historyApiFallback: true,
    devMiddleware: { publicPath: '/dist/' },
    static: { directory: path.resolve(__dirname) },
    port: 3000,
    hot: true,
  },
};

if (config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
  // 서버를 따로 띄움 => localhost:8888
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: true }));
}

module.exports = config;
