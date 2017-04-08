let appConfig = require('../config')

// require('babel-register')
require('babel-polyfill')
require('css-modules-require-hook/preset')
require('asset-require-hook')({
    name: appConfig.static + 'assets/images/[name].[ext]',
    extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    limit: 2000
})
require('./server')
