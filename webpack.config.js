const path = require('path')
const Webpack = require('webpack')

process.env.BABEL_ENV = process.env.NODE_ENV

const CopyPlugin = require('copy-webpack-plugin')

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    cacheCompression: true,
    compact: true,
  },
}

module.exports = () => ({
  context: __dirname,
  mode: 'production',
  entry: {
    main: [
      './src/popup.html',
      path.join(__dirname, './src/main.js'),
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },

  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/manifest.json', to: '' },
        { from: './src/background.js', to: '' },
        { from: './src/content.js', to: '' },
        { from: './src/icon16.png', to: '' },
        { from: './src/icon48.png', to: '' },
        { from: './src/icon128.png', to: '' },
        { from: './src/spinner.gif', to: '' },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loaders: [babelLoader],
      }, {
        test: /\.html$/,
        loader: ['file-loader?name=[name].[ext]', './propreplace-loader.js'],
      },
    ],
  },
})
