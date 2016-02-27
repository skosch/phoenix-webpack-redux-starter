var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var env = process.env.MIX_ENV || 'dev';
var isProduction = (env === 'prod');

var plugins = [
  new ExtractTextPlugin('app.css'),
  new CopyWebpackPlugin([
      { from: './web/static/app/assets' },
      { from: './web/static/backstage/assets' },
      { from: './deps/phoenix_html/web/static/js/phoenix_html.js',
        to: 'js/phoenix_html.js' }
      ]),
  new webpack.NoErrorsPlugin(),
];

// This is necessary to get the sass @import's working
var stylePathResolves = (
    'includePaths[]=' + path.resolve('./') + '&' +
    'includePaths[]=' + path.resolve('./node_modules')
  );

var jsLoaders = ['babel?presets[]=react,presets[]=es2015,plugins[]=transform-decorators-legacy'];

if (isProduction) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  jsLoaders.unshift('react-hot');
}

var publicPath = "http://localhost:4001/";
var productionEntry = {
  app: './web/static/app/js/index.js',
  admin: './web/static/backstage/js/index.js'
};
var devEntry = {};
for (var key in productionEntry) {
  devEntry[key] = [
    'webpack-dev-server/client?' + publicPath,
    'webpack/hot/only-dev-server',
    productionEntry[key]
  ];
}

module.exports = {
  devtool: isProduction ? null : 'eval-sourcemaps',
  entry: isProduction ? productionEntry : devEntry,
  output: {
    path: path.join(__dirname, './priv/static/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    publicPath: publicPath,
  },

  resolve: {
    /*root: path.join(__dirname),
    modulesDirectories: 'node_modules',*/
    alias: {
      phoenix: __dirname + '/deps/phoenix/web/static/js/phoenix.js'
    }
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: jsLoaders,
      }, {
        test: /\.css$/,
        loader: 'style!css',
      }, {
        test: /\.less$/,
        loader: 'style!css!less',
      }, {
        test: /(\.png|\.jpg|\.jpeg)$/,
        loader: 'file',
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  },

  plugins: plugins
};
