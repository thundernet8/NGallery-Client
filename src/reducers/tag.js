import CONSTANTS               from '../constants'

export function topTagsReducer (state = [], action) {
    switch (action.type) {
        case CONSTANTS.FETCH_TOP_TAGS_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export function allTagsReducer (state = [], action) {
    switch (action.type) {
        case CONSTANTS.FETCH_ALL_TAGS_SUCCESS:
            return action.payload
        default:
            return state
    }
}
