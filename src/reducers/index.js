import { combineReducers }                                from 'redux'
import { routerReducer }                                  from 'react-router-redux'
import user                                               from './user'
import history                                            from './history'
import { featuredPostsReducer }                           from './post'
import { featuredCollectionsReducer }                     from './collection'
import { topTagsReducer }                                 from './tag'

export default combineReducers({
    routing: routerReducer,
    user,
    history,
    featuredPosts: featuredPostsReducer,
    featuredCollections: featuredCollectionsReducer,
    topTags: topTagsReducer
})
