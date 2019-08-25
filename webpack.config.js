const nodeExternals = require('webpack-node-externals');

const path = require('path');
const pkgJson = require('./package.json');

module.exports = {
  entry: {
    register: './src/register.tsx',
  },
  mode: 'production',
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    library: pkgJson.name,
    path: path.resolve(__dirname, 'build'),
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [
      /* assuming that one up is where your node_modules sit,
         relative to the currently executing script
      */
      path.join(__dirname, '../node_modules')
    ],
  },
  devtool: false,
  optimization: {
    // We no not want to minimize our code.
    minimize: false,
  },
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
    }),
  ],
};
