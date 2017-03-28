import express                  from 'express'
import webpack                  from 'webpack'
import bodyParser               from 'body-parser';
import compression              from 'compression';
import config                   from '../config'
import devConfig                from '../build/webpack.dev.conf.babel'

let app = express()
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = config.port

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

app.disable('x-powered-by')

if (process.env.NODE_ENV === 'development') {
    app.listen(PORT, 'localhost', err => {
        if (err) {
            return console.error(err)
        }
        console.log(`Listening at http://localhost:${PORT}`)
    })
} else {
    app.listen(PORT, err => {
        if (err) {
            return console.error(err)
        }
        console.log(`Listening at 0.0.0.0:${PORT}`)
    })
}
