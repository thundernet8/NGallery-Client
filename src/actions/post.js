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
                '_id|+1': 1,
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
                'comments|0-100': 1,
                'views|10-10000': 100,
                'author': {
                    '_id|1-1000': 1,
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
