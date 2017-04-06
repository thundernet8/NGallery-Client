import React                                                    from 'react'
import ReactDOM                                                 from 'react-dom'
import createBrowserHistory                                     from 'history/lib/createBrowserHistory'
import { Provider }                                             from 'react-redux'
import { combineReducers }                                      from 'redux'
import configureStore                                           from './store/configureStore'
import createRouter                                             from './routes'
import LocalProvider                                            from './i18n/provider'
import MuiThemeProvider                                         from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme                                              from 'material-ui/styles/getMuiTheme'
import { blue500 }                                              from 'material-ui/styles/colors'
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

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blue500
    }
})

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <LocalProvider>
            <Provider store={store}>
                {createRouter(createBrowserHistory(), (me.profile && me.profile._id) ? me : null)}
            </Provider>
        </LocalProvider>
    </MuiThemeProvider>,
    document.getElementById('app')
)
