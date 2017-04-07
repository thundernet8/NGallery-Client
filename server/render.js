import path                                                     from 'path'
import express                                                  from 'express'
import { RouterContext, match }                                 from 'react-router'
import axios                                                    from 'axios'
import DocumentMeta                                             from 'react-document-meta'
import Promise                                                  from 'bluebird'
import config                                                   from '../config'
import configureStore                                           from '../src/store/configureStore'
import createMemoryHistory                                      from 'history/lib/createMemoryHistory'
import CONSTANTS                                                from '../src/constants'
import createRouter                                             from '../src/routes'
import { renderToString }                                       from 'react-dom/server'
import { Provider }                                             from 'react-redux'
import LocalProvider                                            from '../src/i18n/provider'
import ThemeProvider                                            from '../src/components/muiTheme'
import Actions                                                  from '../src/actions'
import React                                                    from 'react'

const ssrRouter = express.Router()

const getReduxPromise = async(renderProps, store, history) => {
    let {
        query,
        params
    } = renderProps
    let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent
    if (comp.fetchData) { // 组件拥有static方法fetchData用于服务器端渲染时决定如何预加载数据
        return await comp.fetchData({query, params, store, history})
    } else {
        return
    }
}

const authorize = async(token) => {
    if (!token) {
        return new Error('no token')
    }

    const axiosInstance = axios.create({
        baseURL: config.nodeApi,
        timeout: 1000,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    try {
        const response = await axiosInstance.get('/me')
        const data = response.data
        if (user && user._id) {
            return user
        } else {
            return new Error('invalid user profile')
        }
    } catch (error) {
        return new Error(err)
    }
}

ssrRouter.route('*').get(async(req, res) => {
    const history = createMemoryHistory()
    const store = configureStore({
        user: {
            profile: {},
            accessToken: ''
        },
        history: []
    })

    let token = req.cookies && req.cookies[config.tokenCookie] || ''
    let profile = null
    let authResult = await authorize(token)
    if (authResult instanceof Error) {
        res.clearCookie(config.tokenCookie)
        token = ''
    } else {
        profile = authResult
        store.dispatch(Actions.setAccessToken(token))
        store.dispatch(Actions.setUser(profile))
    }

    const routes = createRouter(history, (profile && profile._id) ? {
        profile,
        accessToken: token
    } : null)

    match({routes, location: req.originalUrl}, async(error, nextLocation, nextState) => {
        if (nextLocation) {
            res.redirect(302, nextLocation.pathname + nextLocation.search)
        } else if (error) {
            res.send(500, error.message)
        } else if (!nextState) {
            res.status(404)
            res.render('../dist/notFound.ejs')
        } else {
            const result = await getReduxPromise(nextState, store, history)
            if (result instanceof Error) { // 例如预加载某篇文章但是数据不存在，应该返回404
                res.status(404)
                res.render('../dist/notFound.ejs')
            } else {
                const reduxState = JSON.stringify(store.getState())
                const html = renderToString(
                    <ThemeProvider userAgent={global.navigator.userAgent}>
                        <LocalProvider language={global.navigator.language}>
                            <Provider store={store}>{<RouterContext {...nextState} />}</Provider>
                        </LocalProvider>
                    </ThemeProvider>
                )
                const jhtml = JSON.stringify(html)
                const meta = DocumentMeta.renderAsHTML()
                res.render('../dist/index.ejs', {meta, html: jhtml, reduxState})
            }
        }
    })


    const meta = DocumentMeta.renderAsHTML()
    const reduxState = JSON.stringify({
        user: {
            profile,
            accessToken: token
        }
    })
    res.render(path.resolve(__dirname, '../dist/index.ejs'), {
        meta,
        reduxState
    });
})

export default ssrRouter
