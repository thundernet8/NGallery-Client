const devConfig = {
    debug: true,
    host: 'localhost',
    port: 3000,
    api: 'http://api.fuli.news/api/v1'
}

const prodConfig = {
    debug: false,
    host: 'localhost',
    port: 8080,
    api: 'http://api.fuli.news/api/v1'
}

module.exports = process.env.NODE_ENV == 'development' ? devConfig : prodConfig
