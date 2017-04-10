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
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            [`list|${count}`]: [{
                '_id|1-1000': 10,
                'name': '@string(lower, 5, 10)',
                'posts|1-100': 20
            }]
        }).list

        dispatch({
            type: CONSTANTS.FETCH_TOP_TAGS_SUCCESS,
            payload: tags
        })
        // MockEnd
    }
}