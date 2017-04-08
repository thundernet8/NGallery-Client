import React                                                                from 'react'
import { Route, Router, Redirect, IndexRoute, applyRouterMiddleware }       from 'react-router'
// import { useScroll }                                                        from 'react-router-scroll'
import { getUrlQuery, removeUrlQuery }                                      from './utils/url'
import reactCookie                                                          from 'react-cookie'
import { Base64 }                                                           from 'js-base64'
import appConfig                                                            from '../config'

// Containers
import App from './containers/app'
import Home from './containers/home'

const saveToken = (state, replace) => {
    const { pathname, search } = state.location
    const authInfo = getUrlQuery(appConfig.authInfoKey, search)

    if (authInfo) {
        let infoObj = JSON.parse(Base64.decode(authInfo))
        if (infoObj.token && infoObj.expires && infoObj.expires > (new Date()).getTime()) {
            if (typeof window !== 'undefined') {
                reactCookie.save(appConfig.tokenCookie, infoObj.token, {httpOnly: false, path: '/', expires: new Date(infoObj.expires)})
                location.replace(removeUrlQuery(location.href, appConfig.authInfoKey))
            }
        }
    }
}

export default (history, user) => {
    const triggerEnter = (nextState, replaceState) => {
        saveToken(nextState, replaceState)
    }

    const triggerLeave = (nextState, replaceState) => {

    }

    const requireAuth = (nextState, replaceState) => {
        if (!user) {
            replaceState({
                pathname: '/signin',
                query: {},
                state: {nextPathname: nextState.location.pathname}
            })
            return
        }
        triggerEnter(nextState, replaceState)
    }

    return (
        <Router history={history} /* render={applyRouterMiddleware(useScroll())} */>
            <Route path="/" component={App}>
                <IndexRoute component={Home} onEnter={triggerEnter} onLeave={triggerLeave}/>
            </Route>
        </Router>
    )
}
