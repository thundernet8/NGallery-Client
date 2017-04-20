import CONSTANTS                from '../constants'
import axios                    from 'axios'
import appConfig                from '../../config'
import Mock                     from 'mockjs'

export const getFeaturedPosts = () => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.FETCH_FEATURED_POSTS
        })

        // Mock
        let posts = Mock.mock({
            'list|3': [{
                'id|+1': 1,
                'title': '@title',
                'images|1-5': [{
                    'url': '@dataImage(300x225, "")',
                    'title': '@title'
                }],
                'featuredImage': {
                    'url': '@dataImage(300x225, "")',
                    'title': '@title'
                },
                'likes|0-1000': 20,
                'commentsCount|0-100': 1,
                'views|10-10000': 100,
                'author': {
                    'id|1-1000': 1,
                    'nickname': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                }
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_FEATURED_POSTS_SUCCESS,
            payload: posts
        })

        // MockEnd
    }
}

export const getHomePopularPosts = (page) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_HOME_POPULAR_POSTS
        })

        let state = getState()
        let offset = state.homePopularPosts.length // 加载实际分页
        let limit = 12 // 每页12篇

        if ((page - 1) * limit < offset) {
            console.log(`offset-${offset}, page-${page}`)
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
                    'url': '@dataImage(0, "")',
                    'title': '@title'
                },
                'likes|0-1000': 20,
                'commentsCount|0-100': 1,
                'views|10-10000': 100,
                'author': {
                    'id|1-1000': 1,
                    'nickname': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                }
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_HOME_POPULAR_POSTS_SUCCESS,
            payload: page === 1 ? {total: 100, items: posts} : {total: 100, items: state.homePopularPosts.items.concat(posts)}
        })
        // MockEnd
    }
}

export const getLatestPosts = (page) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_LATEST_POSTS
        })

        let state = getState()
        let offset = state.latestPosts.length // 加载实际分页
        let limit = 12 // 每页12篇

        if ((page - 1) * limit < offset) {
            console.log(`offset-${offset}, page-${page}`)
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
                    'url': '@dataImage(0, "")',
                    'title': '@title'
                },
                'likes|0-1000': 20,
                'commentsCount|0-100': 1,
                'views|10-10000': 100,
                'author': {
                    'id|1-1000': 1,
                    'nickname': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                }
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_LATEST_POSTS_SUCCESS,
            payload: page === 1 ? {total: 100, items: posts} : {total: 100, items: state.latestPosts.items.concat(posts)}
        })
        // MockEnd
    }
}

export const getRandomPosts = (page) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_RANDOM_POSTS
        })

        let state = getState()
        let offset = state.randomPosts.length // 加载实际分页
        let limit = 12 // 每页12篇

        if ((page - 1) * limit < offset) {
            console.log(`offset-${offset}, page-${page}`)
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
                    'url': '@dataImage(0, "")',
                    'title': '@title'
                },
                'likes|0-1000': 20,
                'commentsCount|0-100': 1,
                'views|10-10000': 100,
                'author': {
                    'id|1-1000': 1,
                    'nickname': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                }
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_RANDOM_POSTS_SUCCESS,
            payload: page === 1 ? {total: 100, items: posts} : {total: 100, items: state.randomPosts.items.concat(posts)}
        })
        // MockEnd
    }
}

export const getTagPosts = (tag, order, page) => {
    // tag为null时即为所有posts
    // order - popular|latest
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_TAG_POSTS
        })

        let state = getState()
        let offset = state.tagPosts.length // 加载实际分页
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
                    'nickname': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                },
                'createdAt': '@date(yyyy-MM-dd)'
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_TAG_POSTS_SUCCESS,
            payload: page === 1 ? {total: 100, items: posts} : {total: 100, items: state.tagPosts.items.concat(posts)}
        })
        // MockEnd
    }
}

export const getCollectionPosts = (collectionId, order, page) => {
    // order - popular|latest
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_COLLECTION_POSTS
        })

        let state = getState()
        let offset = state.collectionPosts.length // 加载实际分页
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
                    'nickname': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                },
                'createdAt': '@date(yyyy-MM-dd)',
                'lastReviewer': {
                    'id|1-1000': 10,
                    'nickname': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                },
                'voters|0-20': [{
                    'id|1-1000': 10,
                    'nickname': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                }],
                'tags|1-25': [{
                    'id|1-1000': 10,
                    'name': '@string(lower, 5, 10)',
                    'slug': '@name',
                    'posts|1-150': 20
                }]
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_COLLECTION_POSTS_SUCCESS,
            payload: page === 1 ? {total: 100, items: posts} : {total: 100, items: state.collectionPosts.items.concat(posts)}
        })
        // MockEnd
    }
}

export const getShareList = (order, page) => {
    // order - popular|latest|toplike|random
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_SHARE_LIST
        })

        let state = getState()
        let offset = state.shareList.length // 加载实际分页
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
                    'url': '@dataImage(400x600, "")',
                    'title': '@title',
                    'width': 400,
                    'height': 600
                },
                'likes|0-1000': 20,
                'views|10-10000': 100,
                'author': {
                    'id|1-1000': 1,
                    'nickname': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                },
                'createdAt': '@date(yyyy-MM-dd)'
            }]
        }).list

        setTimeout(function () {
            dispatch({
                type: CONSTANTS.FETCH_SHARE_LIST_SUCCESS,
                payload: page === 1 ? {total: 100, items: posts} : {total: 100, items: state.shareList.items.concat(posts)}
            })
        }, 3000)
        // MockEnd
    }
}

export const getRandShares = (count = 5) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_RANDOM_SHARES
        })

        // Mock
        let shares = Mock.mock({
            [`list|${count}`]: [{
                'id|+1': 1,
                'title': '@title',
                'images|1-5': [{
                    'url': '@dataImage(0, "")',
                    'title': '@title'
                }],
                'featuredImage': {
                    'url': '@dataImage(400x600, "")',
                    'title': '@title',
                    'width': 400,
                    'height': 600
                },
                'likes|0-1000': 20,
                'views|10-10000': 100,
                'author': {
                    'id|1-1000': 1,
                    'nickname': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                },
                'createdAt': '@date(yyyy-MM-dd)'
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_RANDOM_SHARES_SUCCESS,
            payload: shares
        })
        // MockEnd
    }
}

export const getRandGalleries = (count = 5) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_RANDOM_GALLERIES
        })

        // Mock
        let galleries = Mock.mock({
            [`list|${count}`]: [{
                'id|+1': 1,
                'title': '@title',
                'images|1-5': [{
                    'url': '@dataImage(0, "")',
                    'title': '@title'
                }],
                'featuredImage': {
                    'url': '@dataImage(400x300, "")',
                    'title': '@title',
                    'width': 400,
                    'height': 300
                },
                'likes|0-1000': 20,
                'views|10-10000': 100,
                'author': {
                    'id|1-1000': 1,
                    'nickname': '@cname',
                    'avatar': '@dataImage(64x64, "")'
                },
                'createdAt': '@date(yyyy-MM-dd)'
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_RANDOM_GALLERIES_SUCCESS,
            payload: galleries
        })
        // MockEnd
    }
}
