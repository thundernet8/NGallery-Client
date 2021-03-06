import { combineReducers }                                from 'redux'
import { routerReducer }                                  from 'react-router-redux'
import user, {
    authorReducer,
    authorPostsReducer,
    authorShareReducer,
    authorLikesReducer,
    authorCollectionsReducer,
    authorFollowersReducer,
    authorFollowingReducer
}                                                         from './user'
import history                                            from './history'
import {
    featuredPostsReducer,
    homePopularPostsReducer,
    latestPostsReducer,
    randomPostsReducer,
    tagPostsReducer,
    collectionPostsReducer
}                                                         from './post'
import {
    featuredCollectionsReducer,
    collectionsReducer,
    followingCollectionsReducer,
    myCollectionsReducer,
    collectionReducer
}                                                         from './collection'
import {
    topTagsReducer,
    allTagsReducer
}                                                         from './tag'

import { searchResultReducer }                            from './search'

import { articleReducer }                                 from './article'

export default combineReducers({
    routing: routerReducer,
    user,
    history,
    featuredPosts: featuredPostsReducer,
    featuredCollections: featuredCollectionsReducer,
    topTags: topTagsReducer,
    tags: allTagsReducer,
    homePopularPosts: homePopularPostsReducer,
    latestPosts: latestPostsReducer,
    randomPosts: randomPostsReducer,
    tagPosts: tagPostsReducer,
    collections: collectionsReducer,
    followingCollections: followingCollectionsReducer,
    myCollections: myCollectionsReducer,
    collectionPosts: collectionPostsReducer,
    collection: collectionReducer,
    author: authorReducer,
    authorPosts: authorPostsReducer,
    authorShare: authorShareReducer,
    authorLikes: authorLikesReducer,
    authorCollections: authorCollectionsReducer,
    authorFollowers: authorFollowersReducer,
    authorFollowing: authorFollowingReducer,
    searchResult: searchResultReducer,
    article: articleReducer
})
