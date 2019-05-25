const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtendedDefinePlugin = require('extended-define-webpack-plugin');

const outputDirectory = 'dist';

const DEFAULT_BASENAME = '/';
const DEFAULT_CHANNEL = 'devel';
const DEFAULT_BRANDING = '';
const DEFAULT_VERSION = '0.0.0';
const DEFAULT_SOURCE_VERSION = '0';

const CHANNELS = ['alpha', 'beta', 'release'];
const PRODUCTION = 'production';
const DEVELOPMENT = 'development';

/**
 * @param {Object} env Contains environment passed when building with the following format:
 *
 *  {alpha,beta,release,devel}-{branding}-{basename}-{version}
 *
 *  IMPORTANT! If this format is extended, you have to modify the pervious doc with new format.
 *  Be merciful with the rest of us
 */
module.exports = (env) => {
  const buildMetaData = env
    ? env.SOURCE_BRANCH_NAME.split('_')
    : [DEFAULT_CHANNEL, DEFAULT_BRANDING, DEFAULT_BASENAME, DEFAULT_VERSION];
  const channel = buildMetaData[0];
  const branding = buildMetaData[1]; // Not used atm. Leave to use in custom build and devops triggers.
  const basename = buildMetaData[2];
  const version = buildMetaData[3];
  const sourceVersion = env ? env.SOURCE_VERSION : DEFAULT_SOURCE_VERSION;

  return {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: path.join(__dirname, outputDirectory),
      filename: 'bundle.js',
      publicPath: basename === DEFAULT_BASENAME ? basename : `/${basename}/`, //added so routers work correctly
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000',
        },
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader'],
        },
        { test: /\.(config)$/, loader: 'file-loader?name=[name].[ext]' },
      ],
    },
    resolve: {
      modules: [path.resolve('./src'), path.resolve('./node_modules')],
      alias: {
        assets: path.resolve('./src/assets'),
      },
    },
    devServer: {
      port: 3000,
      open: true,
      openPage: basename === DEFAULT_BASENAME ? '' : `${basename}/`,
      historyApiFallback: true, //added so routers work correctly
      host: 'localhost',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),
      new ExtendedDefinePlugin({
        'process.env.BASENAME': basename === DEFAULT_BASENAME ? basename : `/${basename}/`,
        'process.env.CHANNEL': channel,
        'process.env.ENVIRONMENT': CHANNELS.some((c) => channel.includes(c))
          ? PRODUCTION
          : DEVELOPMENT,
        'process.env.VERSION': version,
        'process.env.SOURCE_VERSION': sourceVersion,
      }),
    ],
  };
};
