import CONSTANTS               from '../constants'

export function featuredCollectionsReducer (state = [], action) {
    switch (action.type) {
        case CONSTANTS.FETCH_FEATURED_COLLECTIONS_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export function collectionsReducer (state = [], action) {
    switch (action.type) {
        case CONSTANTS.FETCH_ALL_COLLECTIONS_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export function followingCollectionsReducer (state = [], action) {
    switch (action.type) {
        case CONSTANTS.FETCH_FOLLOWING_COLLECTIONS_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export function myCollectionsReducer (state = [], action) {
    switch (action.type) {
        case CONSTANTS.FETCH_MY_COLLECTIONS_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export function collectionReducer (state = null, action) {
    switch (action.type) {
        case CONSTANTS.FETCH_THE_COLLECTION_SUCCESS:
            return action.payload
        default:
            return state
    }
}
