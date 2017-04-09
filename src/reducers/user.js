import CONSTANTS               from '../constants'

const initialState = {
    profile: {},
    accessToken: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CONSTANTS.REQUEST_LOGIN_SUCCESS:
            return action.payload
        case CONSTANTS.SET_ACCESS_TOKEN:
            state.accessToken = action.token
            return Object.assign({}, state)
        case CONSTANTS.DELETE_ACCESS_TOKEN:
            state.accessToken = ''
            return Object.assign({}, state)
        case CONSTANTS.SET_USER:
            state.profile = action.profile
            return Object.assign({}, state)
        case CONSTANTS.SIGN_OUT:
            return initialState
        default:
            return state
    }
}
