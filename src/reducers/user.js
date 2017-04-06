import CONSTANTS               from '../constants'

const initialState = {
    profile: {},
    accessToken: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CONSTANTS.REQUEST_LOGIN_SUCCESS:
            return action.payload
        default:
            return state
    }
}
