import * as api             from './api'
import * as user            from './user'
import * as post            from './post'
import * as collection      from './collection'
import * as tag             from './tag'
import * as others          from './others'

export default Object.assign(
    {},
    api,
    user,
    post,
    collection,
    tag,
    others
)
