import React                        from 'react'
import { connect }                  from 'react-redux'
import ClassNames                   from 'classnames'
import * as styles                  from './style.scss'
import TagPostsMain                 from '../../components/tagPostsMain'
import TagPostsSidebar              from '../../components/tagPostsSidebar'

// 当url tag参数为空时即为所有posts展示
class TagPosts extends React.Component {
    render () {
        const tag = this.props.params && this.props.params.tag ? this.props.params.tag : null
        return (
            <div className={ClassNames(styles.content, styles.contentFull)}>
                <div className={ClassNames(styles.row, 'row')}>
                    <TagPostsSidebar tag={tag}/>
                    <TagPostsMain tag={tag}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(TagPosts)
