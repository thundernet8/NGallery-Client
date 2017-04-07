import path from 'path'
import webpack from 'webpack'
import baseConfig from './webpack.base.conf.babel'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import merge from 'webpack-merge'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackIncludeAssetsPlugin from 'html-webpack-include-assets-plugin'
import config from '../config'

baseConfig.entry = {}

let appProdConfig = {
    // whether to generate source map for production files.
    // disabling this can speed up the build.
    devtool: false, // '#source-map',

    entry: {
        app: [
            'babel-polyfill',
            './src/index.jsx'
        ],
        vendors: [ // https://github.com/dmachat/angular-webpack-cookbook/wiki/Split-app-and-vendors
            'react',
            'react-dom',
            'react-router',
            'react-router-redux',
            'react-cookie',
            'babel-polyfill',
            'redux',
            'redux-thunk',
            'react-redux',
            //'react-ga',
            'axios',
            'material-ui',
            'rc-notification'
        ]
    },

    output: {
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[id].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: config.static
    },

    module: {
        rules: [{
            test: /\.jsx$/,
            loader: 'babel-loader?presets[]=react&presets[]=es2015&presets[]=es2017&presets[]=stage-2',
            exclude: /node_modules/
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new CopyWebpackPlugin([
            {from: 'src/styles/global/404.css', to: '../dist'}
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.[hash:8].js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            },
            canPrint: true
        }),
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: '../dist/index.ejs',
            template: 'src/index.html',
            inject: true,
            meta: '<%- meta %>',
            htmlDom: '<%- html %>',
            reduxState: '<%- reduxState %>',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../dist/notFound.ejs',
            template: 'src/404.html',
            inject: true,
            title: `404 - ${config.app}`,
            excludeChunks: ['app', 'vendors'],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['404.css'],
            append: false,
            publicPath: config.static,
            hash: true
        })
    ]
}

export default merge(baseConfig, appProdConfig)
