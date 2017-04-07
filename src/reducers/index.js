import { combineReducers }                                from 'redux'
import { routerReducer }                                  from 'react-router-redux'
import user                                               from './user'
import history                                            from './history'

export default combineReducers({
    routing: routerReducer,
    user,
    history
})
