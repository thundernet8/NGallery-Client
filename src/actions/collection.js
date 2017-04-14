import CONSTANTS                from '../constants'
import axios                    from 'axios'
import appConfig                from '../../config'
import Mock                     from 'mockjs'

export const getFeaturedCollections = () => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.FETCH_FEATURED_COLLECTIONS
        })

        // Mock
        Mock.Random.title()
        Mock.Random.dataImage()
        Mock.Random.cname()
        let collections = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|3': [{
                'id|1-1000': 1,
                'name': '@title',
                'featuredImage': {
                    'url': '@dataImage(400x300)',
                    'title': '@title'
                },
                'smallThumbs|0-3': [{
                    'url': '@dataImage(200x150)',
                    'title': '@title'
                }],
                'posts|0-100': 10,
                'followers|0-100': 1,
                'author': {
                    'id|1-1000': 1,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64)'
                }
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_FEATURED_COLLECTIONS_SUCCESS,
            payload: collections
        })
        // MockEnd
    }
}

export const getAllCollections = (page) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_ALL_COLLECTIONS
        })

        let state = getState()
        let offset = state.collections.length // 加载实际分页
        let limit = 12 // 每页12篇

        if ((page - 1) * limit < offset) {
            return
        }

        // Mock
        Mock.Random.title()
        Mock.Random.dataImage()
        Mock.Random.cname()
        Mock.Random.date()
        Mock.Random.string()
        let collections = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            [`list|${limit}`]: [{
                'id|1-1000': 1,
                'name': '@title',
                'description': '@string(lower, 25, 50)',
                'featuredImage': {
                    'url': '@dataImage(400x300)',
                    'title': '@title'
                },
                'smallThumbs|0-3': [{
                    'url': '@dataImage(200x150)',
                    'title': '@title'
                }],
                'posts|0-100': 10,
                'followers|0-100': 1,
                'author': {
                    'id|1-1000': 1,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64)'
                },
                'createdAt': '@date(yyyy-MM-dd)'
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_ALL_COLLECTIONS_SUCCESS,
            payload: page === 1 ? collections : state.collections.concat(collections)
        })
        // MockEnd
    }
}

export const getFollowingCollections = (page) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_FOLLOWING_COLLECTIONS
        })

        let state = getState()
        let offset = state.followingCollections.length // 加载实际分页
        let limit = 12 // 每页12篇

        if ((page - 1) * limit < offset) {
            return
        }

        // Mock
        Mock.Random.title()
        Mock.Random.dataImage()
        Mock.Random.cname()
        Mock.Random.date()
        let collections = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            [`list|${limit}`]: [{
                'id|1-1000': 1,
                'name': '@title',
                'featuredImage': {
                    'url': '@dataImage(400x300)',
                    'title': '@title'
                },
                'smallThumbs|0-3': [{
                    'url': '@dataImage(200x150)',
                    'title': '@title'
                }],
                'posts|0-100': 10,
                'followers|0-100': 1,
                'author': {
                    'id|1-1000': 1,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64)'
                },
                'createdAt': '@date(yyyy-MM-dd)'
                // TODO following date
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_FOLLOWING_COLLECTIONS_SUCCESS,
            payload: page === 1 ? collections : state.followingCollections.concat(collections)
        })
        // MockEnd
    }
}

export const getMyCollections = (page) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_MY_COLLECTIONS
        })

        let state = getState()
        let offset = state.myCollections.length // 加载实际分页
        let limit = 12 // 每页12篇

        if ((page - 1) * limit < offset) {
            return
        }

        // Mock
        Mock.Random.title()
        Mock.Random.dataImage()
        Mock.Random.cname()
        Mock.Random.date()
        let collections = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            [`list|${limit}`]: [{
                'id|1-1000': 1,
                'name': '@title',
                'featuredImage': {
                    'url': '@dataImage(300x225)',
                    'title': '@title'
                },
                'smallThumbs|0-3': [{
                    'url': '@dataImage(200x150)',
                    'title': '@title'
                }],
                'posts|0-100': 10,
                'followers|0-100': 1,
                'author': {
                    'id|1-1000': 1,
                    'name': '@cname',
                    'avatar': '@dataImage(64x64)'
                },
                'createdAt': '@date(yyyy-MM-dd)'
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_MY_COLLECTIONS_SUCCESS,
            payload: page === 1 ? collections : state.myCollections.concat(collections)
        })
        // MockEnd
    }
}

export const getCollection = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_THE_COLLECTION
        })

        // Mock
        Mock.Random.title()
        Mock.Random.dataImage()
        Mock.Random.cname()
        Mock.Random.date()
        let collection = Mock.mock({
            'id|1-1000': 1,
            'name': '@title',
            'featuredImage': {
                'url': '@dataImage(300x225)',
                'title': '@title'
            },
            'smallThumbs|0-3': [{
                'url': '@dataImage(200x150)',
                'title': '@title'
            }],
            'posts|0-100': 10,
            'followers|0-100': 1,
            'author': {
                'id|1-1000': 1,
                'name': '@cname',
                'avatar': '@dataImage(64x64)'
            },
            'createdAt': '@date(yyyy-MM-dd)'
        })

        dispatch({
            type: CONSTANTS.FETCH_THE_COLLECTION_SUCCESS,
            payload: collection
        })
        // MockEnd
    }
}
