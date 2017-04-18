import CONSTANTS               from '../constants'

const initialState = {
    profile: {},
    accessToken: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CONSTANTS.REQUEST_LOGIN_SUCCESS:
            return action.payload
        case CONSTANTS.SET_ACCESS_TOKEN:
            state.accessToken = action.token
            return Object.assign({}, state)
        case CONSTANTS.DELETE_ACCESS_TOKEN:
            state.accessToken = ''
            return Object.assign({}, state)
        case CONSTANTS.SET_USER:
            state.profile = action.profile
            return Object.assign({}, state)
        case CONSTANTS.SIGN_OUT:
            return initialState
        default:
            return state
    }
}

export function authorReducer (state = null, action) {
    switch (action.type) {
        case CONSTANTS.FETCH_AUTHOR_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export function authorPostsReducer (state = {items: []}, action) {
    switch (action.type) {
        case CONSTANTS.FETCH_AUTHOR_POSTS_SUCCESS:
            return action.payload
        case CONSTANTS.CLEAN_AUTHOR_POSTS:
            return {total: state.total, items: []}
        default:
            return state
    }
}

export function authorShareReducer (state = {items: []}, action) {
    switch (action.type) {
        case CONSTANTS.FETCH_AUTHOR_SHARE_SUCCESS:
            return action.payload
        case CONSTANTS.CLEAN_AUTHOR_SHARE:
            return {total: state.total, items: []}
        default:
            return state
    }
}

export function authorLikesReducer (state = {items: []}, action) {
    switch (action.type) {
        case CONSTANTS.FETCH_AUTHOR_LIKES_SUCCESS:
            return action.payload
        case CONSTANTS.CLEAN_AUTHOR_LIKES:
            return {total: state.total, items: []}
        default:
            return state
    }
}

export function authorCollectionsReducer (state = {items: []}, action) {
    switch (action.type) {
        case CONSTANTS.FETCH_AUTHOR_COLLECTIONS_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export function authorFollowersReducer (state = {items: []}, action) {
    switch (action.type) {
        case CONSTANTS.FETCH_AUTHOR_FOLLOWERS_SUCCESS:
            return action.payload
        case CONSTANTS.CLEAN_AUTHOR_FOLLOWERS:
            return {total: state.total, items: []}
        default:
            return state
    }
}

export function authorFollowingReducer (state = {items: []}, action) {
    switch (action.type) {
        case CONSTANTS.FETCH_AUTHOR_FOLLOWING_SUCCESS:
            return action.payload
        case CONSTANTS.CLEAN_AUTHOR_FOLLOWING:
            return {total: state.total, items: []}
        default:
            return state
    }
}
