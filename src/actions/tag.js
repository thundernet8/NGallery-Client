import CONSTANTS                from '../constants'
import axios                    from 'axios'
import appConfig                from '../../config'
import Mock                     from 'mockjs'

export const getTopTags = (count) => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.FETCH_TOP_TAGS
        })

        // Mock
        Mock.Random.title()
        Mock.Random.string()
        let tags = Mock.mock({
            // 属性 list 的值是一个数组
            [`list|${count}`]: [{
                'id|1-1000': 10,
                'name': '@string(lower, 5, 10)',
                'postsCount|1-100': 20
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_TOP_TAGS_SUCCESS,
            payload: tags
        })
        // MockEnd
    }
}

export const getAllTags = () => {
    // tags是随机排序
    // TODO 名称或posts数量排序
    return dispatch => {
        dispatch({
            type: CONSTANTS.FETCH_ALL_TAGS
        })

        // Mock
        Mock.Random.title()
        Mock.Random.string()
        let tags = Mock.mock({
            // 属性 list 的值是一个数组
            [`list|10-50`]: [{
                'id|1-1000': 10,
                'name': '@string(lower, 5, 10)',
                'slug': '@name',
                'postsCount|1-150': 20
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_ALL_TAGS_SUCCESS,
            payload: tags
        })
        // MockEnd
    }
}
