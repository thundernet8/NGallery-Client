const dockerized = false

const baseConfig = {
    app: 'NGallery',
    description: '',
    tokenCookie: 'NGallery_Token',
    authInfoKey: '_auth',
    authRedirectKey: '_redirect',
    dockerized: dockerized,
    host: dockerized ? '0.0.0.0' : 'localhost', // for express listen
    static: dockerized ? 'http://static2.fuli.news/' : '/'
}

const devConfig = {
    debug: true,
    home: 'http://localhost:4000',
    port: 4000,
    nodeApi: dockerized ? 'http://api-node:8080/api/v1' : 'http://api.fuli.news/api/v1', // 'http://localhost:5000/api/v1'
    api: 'http://localhost:5000/api/v1',
    accountCenter: 'http://localhost:3000'
}

const prodConfig = {
    debug: false,
    home: 'http://www.fuli.news',
    port: 8080,
    nodeApi: dockerized ? 'http://api-node:8080/api/v1' : 'http://api.fuli.news/api/v1',
    api: 'http://api.fuli.news/api/v1',
    accountCenter: 'http://account.fuli.news'
}

module.exports = process.env.NODE_ENV === 'development' ? Object.assign({}, baseConfig, devConfig) : Object.assign({}, baseConfig, prodConfig)
