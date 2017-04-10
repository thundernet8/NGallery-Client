import CONSTANTS               from '../constants'

const initialFeaturedPostsState = []

export function featuredPostsReducer (state = initialFeaturedPostsState, action) {
    switch (action.type) {
        case CONSTANTS.FETCH_FEATURED_POSTS_SUCCESS:
            return action.payload
        default:
            return state
    }
}
