import CONSTANTS               from '../constants'

export function searchResultReducer (state = null, action) {
    switch (action.type) {
        case CONSTANTS.FETCH_SEARCH_RESULTS_SUCCESS:
            return action.payload
        case CONSTANTS.CLEAN_SEARCH_SHARE_RESULTS:
            return null
        default:
            return state
    }
}
