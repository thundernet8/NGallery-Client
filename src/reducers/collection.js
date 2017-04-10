import CONSTANTS               from '../constants'

const initialFeaturedCollectionsState = []

export function featuredCollectionsReducer (state = initialFeaturedCollectionsState, action) {
    switch (action.type) {
        case CONSTANTS.FETCH_FEATURED_COLLECTIONS_SUCCESS:
            return action.payload
        default:
            return state
    }
}
