import CONSTANTS               from '../constants'

export function featuredPostsReducer (state = [], action) {
    switch (action.type) {
        case CONSTANTS.FETCH_FEATURED_POSTS_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export function homePopularPostsReducer (state = {items: []}, action) {
    switch (action.type) {
        case CONSTANTS.FETCH_HOME_POPULAR_POSTS_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export function latestPostsReducer (state = {items: []}, action) {
    switch (action.type) {
        case CONSTANTS.FETCH_LATEST_POSTS_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export function randomPostsReducer (state = {items: []}, action) {
    switch (action.type) {
        case CONSTANTS.FETCH_RANDOM_POSTS_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export function tagPostsReducer (state = {items: []}, action) {
    switch (action.type) {
        case CONSTANTS.FETCH_TAG_POSTS_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export function collectionPostsReducer (state = {items: []}, action) {
    switch (action.type) {
        case CONSTANTS.FETCH_COLLECTION_POSTS_SUCCESS:
            return action.payload
        default:
            return state
    }
}
