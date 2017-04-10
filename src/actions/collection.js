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
                '_id|1-1000': 1,
                'name': '@title',
                'featuredImage': {
                    'url': '@dataImage(300x225)',
                    'title': '@title'
                },
                'posts|0-100': 10,
                'followers|0-100': 1,
                'author': {
                    '_id|1-1000': 1,
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
