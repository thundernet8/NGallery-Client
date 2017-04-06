import express                  from 'express'
import webpack                  from 'webpack'
import bodyParser               from 'body-parser'
import cookieParser             from 'cookie-parser'
import compression              from 'compression'
import config                   from '../config'
import devConfig                from '../build/webpack.dev.conf.babel'
import inject                   from './inject'
import responseTimer            from 'response-time'

let app = express()
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser(config.tokenCookie))
app.use(responseTimer())

if (process.env.NODE_ENV === 'development') {
    let compiler = webpack(devConfig)
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const devMiddleware = webpackDevMiddleware(compiler, {
        publicPath: devConfig.output.publicPath,
        stats: {
            colors: true
            // chunks: false
        }
    })
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const hotMiddleware = webpackHotMiddleware(compiler)

    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({ action: 'reload' })
            cb()
        })
    })

    app.use(devMiddleware)
    app.use(hotMiddleware)
}

app.use(express.static('dist'))

// Support BrowserHistory
app.get('*', inject)

app.disable('x-powered-by')

app.listen(config.port, config.host, err => {
    if (err) {
        return console.error(err)
    }
    console.log(`Listening at http://${config.host}:${config.port}`)
})
