import CONSTANTS               from '../constants'

export function featuredPostsReducer (state = [], action) {
    switch (action.type) {
        case CONSTANTS.FETCH_FEATURED_POSTS_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export function homePopularPostsReducer (state = [], action) {
    switch (action.type) {
        case CONSTANTS.FETCH_HOME_POPULAR_POSTS_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export function latestPostsReducer (state = [], action) {
    switch (action.type) {
        case CONSTANTS.FETCH_LATEST_POSTS_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export function randomPostsReducer (state = [], action) {
    switch (action.type) {
        case CONSTANTS.FETCH_RANDOM_POSTS_SUCCESS:
            return action.payload
        default:
            return state
    }
}
