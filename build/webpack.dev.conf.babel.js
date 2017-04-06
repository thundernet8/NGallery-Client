import path               from 'path'
import webpack            from 'webpack'
import baseConfig         from './webpack.base.conf.babel'
import merge              from 'webpack-merge'
import HtmlWebpackPlugin  from 'html-webpack-plugin'
import config             from '../config'

let devConfig = {
  // eval-source-map is faster for development
  devtool: '#source-map', // '#eval-source-map',

  entry: {
    app: [
      `webpack-hot-middleware/client?path=${config.home}/__webpack_hmr`, // TODO fix
      'babel-polyfill',
      './src/index.jsx'
    ]
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: config.static
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader?presets[]=react&presets[]=es2015&presets[]=es2017&presets[]=stage-2']
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: '../dist/index.ejs',
        inject: true,
        meta: '<%- meta %>',
        reduxState: '<%- reduxState %>'
    })
  ]
}

export default merge(baseConfig, devConfig)
