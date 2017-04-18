import CONSTANTS                from '../constants'
import axios                    from 'axios'
import reactCookie              from 'react-cookie'
import appConfig                from '../../config'
import Mock                     from 'mockjs'

export const getSearchResults = (key, type, page) => {
    // type - post|share
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_SEARCH_RESULTS
        })

        if (!key) {
            dispatch({
                type: CONSTANTS.FETCH_SEARCH_RESULTS_SUCCESS,
                payload: {key, total: 0, items: []}
            })
        }

        let state = getState()
        if (page === 1 && state.searchResult && state.searchResult.items.length) {
            dispatch({
                type: CONSTANTS.CLEAN_SEARCH_SHARE_RESULTS
            })
        }

        let offset = state.searchResult ? state.searchResult.items.length : 0 // 加载实际分页
        let limit = 12 // 每页12篇

        if (page !== 1 && (page - 1) * limit < offset) {
            return
        }

        // Mock
        let items = Mock.mock({
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

        let total = Mock.Random.integer(0, 100)

        dispatch({
            type: CONSTANTS.FETCH_SEARCH_RESULTS_SUCCESS,
            payload: page === 1 ? {key, total, items} : {key, total, items: state.searchResult.items.concat(items)}
        })
        // MockEnd
    }
}
