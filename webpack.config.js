const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // 添加對 CSS 文件的處理
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'sider',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/bootstrap',
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          singleton: true,
          requiredVersion: packageJson.dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        },
      },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3003,
    historyApiFallback: true,
  },
};
