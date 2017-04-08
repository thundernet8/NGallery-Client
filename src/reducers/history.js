import CONSTANTS               from '../constants'

const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case CONSTANTS.ADD_HISTORY:
            if (typeof window === 'undefined' || typeof document === 'undefined') {
                return state
            }
            state.push(window.location.pathname + window.location.search)
            return state
        default:
            return state
    }
}

export function getLastHistory (state) {
    return state.history[state.history.length - 1]
}
