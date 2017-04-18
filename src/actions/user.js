import CONSTANTS                from '../constants'
import axios                    from 'axios'
import reactCookie              from 'react-cookie'
import appConfig                from '../../config'
import Mock                     from 'mockjs'

export const setAccessToken = (token) => {
    return {
        type: CONSTANTS.SET_ACCESS_TOKEN,
        token
    }
}

export const deleteAccessToken = () => {
    return {
        type: CONSTANTS.DELETE_ACCESS_TOKEN
    }
}

export const setUser = (profile) => {
    return {
        type: CONSTANTS.SET_USER,
        profile
    }
}

export const signOut = () => {
    return dispatch => {
        reactCookie.save(appConfig.tokenCookie, '', {expires: new Date(0)})
        dispatch({
            type: CONSTANTS.SIGN_OUT
        })
    }
}

export const getAuthor = (id) => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.FETCH_AUTHOR
        })

        // Mock
        let author = Mock.mock({
            'id': id,
            'username': '@title',
            'nickname': '@cname()',
            'bio': '@string(lower, 10, 25)',
            'site': '',
            'featuredImage': {
                'url': '@dataImage(400x300, "")',
                'title': '@title'
            },
            'avatar': '@dataImage(64x64, "")',
            'createdAt': '@date(yyyy-MM-dd)',
            'usualTags|1-3': [{
                'id|1-1000': 1,
                'name': '@string(lower, 5, 10)',
                'slug': '@name'
            }],
            'postsCount|1-100': 1,
            'sharesCount|1-20': 1,
            'likesCount|1-30': 1,
            'collectionsCount|1-10': 1,
            'followersCount|0-20': 1,
            'followingCount|0-100': 1
        })

        dispatch({
            type: CONSTANTS.FETCH_AUTHOR_SUCCESS,
            payload: author
        })
        // MockEnd
    }
}

export const getAuthorPosts = (uid, order, page) => {
    // order - popular|latest
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_AUTHOR_POSTS
        })
        dispatch({
            type: CONSTANTS.CLEAN_AUTHOR_SHARE
        })
        dispatch({
            type: CONSTANTS.CLEAN_AUTHOR_LIKES
        })

        let state = getState()
        let offset = state.authorPosts.length // 加载实际分页
        let limit = 12 // 每页12篇

        if (page !== 1 && (page - 1) * limit < offset) {
            return
        }

        // Mock
        let posts = Mock.mock({
            [`list|${limit}`]: [{
                'id|+1': 1,
                'title': '@title',
                'images|1-5': [{
                    'url': '@dataImage(0, "")',
                    'title': '@title'
                }],
                'featuredImage': {
                    'url': '@dataImage(400x300, "")',
                    'title': '@title'
                },
                'likes|0-1000': 20,
                'commentsCount|0-100': 1,
                'views|10-10000': 100,
                'author': {
                    'id|1-1000': 1,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                },
                'createdAt': '@date(yyyy-MM-dd)',
                'lastReviewer': {
                    'id|1-1000': 10,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                },
                'voters|0-20': [{
                    'id|1-1000': 10,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                }],
                'tags|1-25': [{
                    'id|1-1000': 10,
                    'name': '@string(lower, 5, 10)',
                    'slug': '@name',
                    'postsCount|1-150': 20
                }]
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_AUTHOR_POSTS_SUCCESS,
            payload: page === 1 ? {total: 100, items: posts} : {total: 100, items: state.authorPosts.concat(posts)}
        })
        // MockEnd
    }
}

export const getAuthorShare = (uid, order, page) => {
    // order - popular|latest
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_AUTHOR_SHARE
        })
        dispatch({
            type: CONSTANTS.CLEAN_AUTHOR_POSTS
        })
        dispatch({
            type: CONSTANTS.CLEAN_AUTHOR_LIKES
        })

        let state = getState()
        let offset = state.authorShare.length // 加载实际分页
        let limit = 12 // 每页12篇

        if (page !== 1 && (page - 1) * limit < offset) {
            return
        }

        // Mock
        let posts = Mock.mock({
            [`list|${limit}`]: [{
                'id|+1': 1,
                'title': '@title',
                'images|1-5': [{
                    'url': '@dataImage(0, "")',
                    'title': '@title'
                }],
                'featuredImage': {
                    'url': '@dataImage(400x300, "")',
                    'title': '@title'
                },
                'likes|0-1000': 20,
                'commentsCount|0-100': 1,
                'views|10-10000': 100,
                'author': {
                    'id|1-1000': 1,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                },
                'createdAt': '@date(yyyy-MM-dd)',
                'lastReviewer': {
                    'id|1-1000': 10,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                },
                'voters|0-20': [{
                    'id|1-1000': 10,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                }],
                'tags|1-25': [{
                    'id|1-1000': 10,
                    'name': '@string(lower, 5, 10)',
                    'slug': '@name',
                    'postsCount|1-150': 20
                }]
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_AUTHOR_SHARE_SUCCESS,
            payload: page === 1 ? {total: 100, items: posts} : {total: 100, items: state.authorShare.concat(posts)}
        })
        // MockEnd
    }
}

export const getAuthorLikes = (uid, order, page) => {
    // order - popular|latest
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_AUTHOR_LIKES
        })
        dispatch({
            type: CONSTANTS.CLEAN_AUTHOR_SHARE
        })
        dispatch({
            type: CONSTANTS.CLEAN_AUTHOR_POSTS
        })

        let state = getState()
        let offset = state.authorLikes.length // 加载实际分页
        let limit = 12 // 每页12篇

        if (page !== 1 && (page - 1) * limit < offset) {
            return
        }

        // Mock
        let posts = Mock.mock({
            [`list|${limit}`]: [{
                'id|+1': 1,
                'title': '@title',
                'images|1-5': [{
                    'url': '@dataImage(0, "")',
                    'title': '@title'
                }],
                'featuredImage': {
                    'url': '@dataImage(400x300, "")',
                    'title': '@title'
                },
                'likes|0-1000': 20,
                'commentsCount|0-100': 1,
                'views|10-10000': 100,
                'author': {
                    'id|1-1000': 1,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                },
                'createdAt': '@date(yyyy-MM-dd)',
                'lastReviewer': {
                    'id|1-1000': 10,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                },
                'voters|0-20': [{
                    'id|1-1000': 10,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                }],
                'tags|1-25': [{
                    'id|1-1000': 10,
                    'name': '@string(lower, 5, 10)',
                    'slug': '@name',
                    'postsCount|1-150': 20
                }]
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_AUTHOR_LIKES_SUCCESS,
            payload: page === 1 ? {total: 100, items: posts} : {total: 100, items: state.authorLikes.concat(posts)}
        })
        // MockEnd
    }
}

export const getAuthorCollections = (id, page) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_AUTHOR_COLLECTIONS
        })

        let state = getState()
        let offset = state.authorCollections.length // 加载实际分页
        let limit = 12 // 每页12篇

        if ((page - 1) * limit < offset) {
            return
        }

        // Mock
        let collections = Mock.mock({
            [`list|${limit}`]: [{
                'id|1-1000': 1,
                'name': '@title',
                'featuredImage': {
                    'url': '@dataImage(300x225, "")',
                    'title': '@title'
                },
                'smallThumbs|0-3': [{
                    'url': '@dataImage(200x150, "")',
                    'title': '@title'
                }],
                'postsCount|0-100': 10,
                'followers|0-100': 1,
                'author': {
                    'id': id,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                },
                'createdAt': '@date(yyyy-MM-dd)'
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_AUTHOR_COLLECTIONS_SUCCESS,
            payload: page === 1 ? {total: 100, items: collections} : {total: 100, items: state.authorCollections.concat(collections)}
        })
        // MockEnd
    }
}

export const getAuthorFollowers = (id, page) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_AUTHOR_FOLLOWERS
        })
        dispatch({
            type: CONSTANTS.CLEAN_AUTHOR_FOLLOWING
        })

        let state = getState()
        let offset = state.authorFollowers.length // 加载实际分页
        let limit = 12 // 每页12篇

        if ((page - 1) * limit < offset) {
            return
        }

        // Mock
        let followers = Mock.mock({
            [`list|${limit}`]: [{
                'id': id,
                'username': '@title',
                'nickname': '@cname()',
                'bio': '@string(lower, 10, 25)',
                'site': '',
                'featuredImage': {
                    'url': '@dataImage(400x300, "")',
                    'title': '@title'
                },
                'avatar': '@dataImage(64x64, "")',
                'createdAt': '@date(yyyy-MM-dd)',
                'usualTags|1-3': [{
                    'id|1-1000': 1,
                    'name': '@string(lower, 5, 10)',
                    'slug': '@name'
                }],
                'postsCount|1-100': 1,
                'sharesCount|1-20': 1,
                'likesCount|1-30': 1,
                'collectionsCount|1-10': 1,
                'followersCount|0-20': 1,
                'followingCount|0-100': 1
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_AUTHOR_FOLLOWERS_SUCCESS,
            payload: page === 1 ? {total: 100, items: followers} : {total: 100, items: state.authorFollowers.concat(followers)}
        })
        // MockEnd
    }
}

export const getAuthorFollowing = (id, page) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_AUTHOR_FOLLOWING
        })
        dispatch({
            type: CONSTANTS.CLEAN_AUTHOR_FOLLOWERS
        })

        let state = getState()
        let offset = state.authorFollowers.length // 加载实际分页
        let limit = 12 // 每页12篇

        if ((page - 1) * limit < offset) {
            return
        }

        // Mock
        let followers = Mock.mock({
            [`list|${limit}`]: [{
                'id': id,
                'username': '@title',
                'nickname': '@cname()',
                'bio': '@string(lower, 10, 25)',
                'site': '',
                'featuredImage': {
                    'url': '@dataImage(400x300, "")',
                    'title': '@title'
                },
                'avatar': '@dataImage(64x64, "")',
                'createdAt': '@date(yyyy-MM-dd)',
                'usualTags|1-3': [{
                    'id|1-1000': 1,
                    'name': '@string(lower, 5, 10)',
                    'slug': '@name'
                }],
                'postsCount|1-100': 1,
                'sharesCount|1-20': 1,
                'likesCount|1-30': 1,
                'collectionsCount|1-10': 1,
                'followersCount|0-20': 1,
                'followingCount|0-100': 1
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_AUTHOR_FOLLOWING_SUCCESS,
            payload: page === 1 ? {total: 100, items: followers} : {total: 100, items: state.authorFollowers.concat(followers)}
        })
        // MockEnd
    }
}
