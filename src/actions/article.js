import CONSTANTS                from '../constants'
import axios                    from 'axios'
import reactCookie              from 'react-cookie'
import appConfig                from '../../config'
import Mock                     from 'mockjs'

export const getArticle = (slug) => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.FETCH_ARTICLE
        })

        // Mock
        Mock.Random.title()
        Mock.Random.dataImage()
        Mock.Random.cname()
        Mock.Random.date()
        Mock.Random.paragraph()
        let article = Mock.mock({
            'id|1-1000': 1,
            'slug': slug,
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
            },
            'createdAt': '@date(yyyy-MM-dd)',
            'updatedAt': '@date(yyyy-MM-dd)',
            'content': '@paragraph(1, 5)'
        })

        dispatch({
            type: CONSTANTS.FETCH_ARTICLE_SUCCESS,
            payload: article
        })

        // MockEnd
    }
}
