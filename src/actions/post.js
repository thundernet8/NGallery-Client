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
        Mock.Random.title()
        Mock.Random.dataImage()
        Mock.Random.cname()
        let posts = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|3': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1,
                'title': '@title',
                'images|1-5': [{
                    'url': '@dataImage(300x225)',
                    'title': '@title'
                }],
                'featuredImage': {
                    'url': '@dataImage(300x225)',
                    'title': '@title'
                },
                'likes|0-1000': 20,
                'commentsCount|0-100': 1,
                'views|10-10000': 100,
                'author': {
                    'id|1-1000': 1,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64)'
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
        Mock.Random.title()
        Mock.Random.dataImage()
        Mock.Random.cname()
        let posts = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            [`list|${limit}`]: [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1,
                'title': '@title',
                'images|1-5': [{
                    'url': '@dataImage()',
                    'title': '@title'
                }],
                'featuredImage': {
                    'url': '@dataImage()',
                    'title': '@title'
                },
                'likes|0-1000': 20,
                'commentsCount|0-100': 1,
                'views|10-10000': 100,
                'author': {
                    'id|1-1000': 1,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64)'
                }
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_HOME_POPULAR_POSTS_SUCCESS,
            payload: state.homePopularPosts.concat(posts)
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
        Mock.Random.title()
        Mock.Random.dataImage()
        Mock.Random.cname()
        let posts = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            [`list|${limit}`]: [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1,
                'title': '@title',
                'images|1-5': [{
                    'url': '@dataImage()',
                    'title': '@title'
                }],
                'featuredImage': {
                    'url': '@dataImage()',
                    'title': '@title'
                },
                'likes|0-1000': 20,
                'commentsCount|0-100': 1,
                'views|10-10000': 100,
                'author': {
                    'id|1-1000': 1,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64)'
                }
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_LATEST_POSTS_SUCCESS,
            payload: state.latestPosts.concat(posts)
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
        Mock.Random.title()
        Mock.Random.dataImage()
        Mock.Random.cname()
        let posts = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            [`list|${limit}`]: [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1,
                'title': '@title',
                'images|1-5': [{
                    'url': '@dataImage()',
                    'title': '@title'
                }],
                'featuredImage': {
                    'url': '@dataImage()',
                    'title': '@title'
                },
                'likes|0-1000': 20,
                'commentsCount|0-100': 1,
                'views|10-10000': 100,
                'author': {
                    'id|1-1000': 1,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64)'
                }
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_RANDOM_POSTS_SUCCESS,
            payload: state.randomPosts.concat(posts)
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
        Mock.Random.title()
        Mock.Random.dataImage()
        Mock.Random.cname()
        Mock.Random.date()
        let posts = Mock.mock({
            // 属性 list 的值是一个数组
            [`list|${limit}`]: [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1,
                'title': '@title',
                'images|1-5': [{
                    'url': '@dataImage()',
                    'title': '@title'
                }],
                'featuredImage': {
                    'url': '@dataImage(400x300)',
                    'title': '@title'
                },
                'likes|0-1000': 20,
                'commentsCount|0-100': 1,
                'views|10-10000': 100,
                'author': {
                    'id|1-1000': 1,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64)'
                },
                'createdAt': '@date(yyyy-MM-dd)'
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_TAG_POSTS_SUCCESS,
            payload: page === 1 ? posts : state.tagPosts.concat(posts)
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
        Mock.Random.title()
        Mock.Random.dataImage()
        Mock.Random.cname()
        Mock.Random.date()
        let posts = Mock.mock({
            // 属性 list 的值是一个数组
            [`list|${limit}`]: [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1,
                'title': '@title',
                'images|1-5': [{
                    'url': '@dataImage()',
                    'title': '@title'
                }],
                'featuredImage': {
                    'url': '@dataImage(400x300)',
                    'title': '@title'
                },
                'likes|0-1000': 20,
                'commentsCount|0-100': 1,
                'views|10-10000': 100,
                'author': {
                    'id|1-1000': 1,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64)'
                },
                'createdAt': '@date(yyyy-MM-dd)',
                'lastReviewer': {
                    'id|1-1000': 10,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64)'
                },
                'voters|0-20': [{
                    'id|1-1000': 10,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64)'
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
            payload: page === 1 ? posts : state.collectionPosts.concat(posts)
        })
        // MockEnd
    }
}
