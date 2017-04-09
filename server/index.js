const appConfig = require('../config')
const hook = require('css-modules-require-hook')
const sassParser = require('postcss-scss').parse
// require('babel-register')
require('babel-polyfill')

hook({
    generateScopedName: '[name]__[local]___[hash:base64:5]',
    extensions: '.scss',
    processorOpts: {parser: sassParser}
})

require('asset-require-hook')({
    name: appConfig.static + 'assets/images/[name].[ext]',
    extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    limit: 2000
})
require('./server')
