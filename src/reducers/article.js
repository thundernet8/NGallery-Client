import CONSTANTS               from '../constants'

export function articleReducer (state = null, action) {
    switch (action.type) {
        case CONSTANTS.FETCH_ARTICLE_SUCCESS:
            return action.payload
        default:
            return state
    }
}
