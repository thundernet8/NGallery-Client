import React                                                    from 'react'
import ReactDOM                                                 from 'react-dom'
import createBrowserHistory                                     from 'history/lib/createBrowserHistory'
import { Provider }                                             from 'react-redux'
import { combineReducers }                                      from 'redux'
import configureStore                                           from './store/configureStore'
import createRouter                                             from './routes'
import LocalProvider                                            from './i18n/provider'
import ThemeProvider                                            from './components/muiTheme'
import injectTapEventPlugin                                     from 'react-tap-event-plugin'
import './styles/global/global.scss'

injectTapEventPlugin()

let store = configureStore(window.__initState__)

const me = store.getState().user

if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers').default
        store.replaceReducer(nextRootReducer)
    })
}

ReactDOM.render(
    <ThemeProvider>
        <LocalProvider language={navigator.language}>
            <Provider store={store}>
                {createRouter(createBrowserHistory(), (me.profile && me.profile.id) ? me : null)}
            </Provider>
        </LocalProvider>
    </ThemeProvider>,
    document.getElementById('app')
)
