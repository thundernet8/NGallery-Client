import CONSTANTS               from '../constants'

const initialTopTagsState = []

export function topTagsReducer (state = initialTopTagsState, action) {
    switch (action.type) {
        case CONSTANTS.FETCH_TOP_TAGS_SUCCESS:
            return action.payload
        default:
            return state
    }
}
