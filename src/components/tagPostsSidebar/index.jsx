import React                        from 'react'
import { connect }                  from 'react-redux'
import { Link }                     from 'react-router'
import ClassNames                   from 'classnames'
import * as styles                  from './style.scss'
import Actions                      from '../../actions'

class TagPostsSidebar extends React.Component {
    state = {
        open: true
    }

    toggleOpen = () => {
        this.setState({
            open: !this.state.open
        })
    }

    componentWillMount () {
        this.props.getAllTags()
    }

    render () {
        const items = this.props.tags.map((tag, index) => {
            return (
                <li key={index} className={styles.tag}>
                    <Link className={ClassNames({[styles.active]: this.props.tag === tag.slug})} to={`/posts/tag/${tag.slug}`}>
                        <span className={styles.tagContent}>
                            <span className={ClassNames(styles.tagName)}>{tag.name}</span>
                            <span className={styles.badge}>{tag.postsCount > 99 ? '99+' : tag.postsCount.toString()}</span>
                        </span>
                    </Link>
                </li>
            )
        })
        return (
            <div className={ClassNames(styles.sidebar, 'col-md-2 col-sm-4')}>
                <div className={ClassNames(styles.tagList, {[styles.open]: this.state.open})}>
                    <div className={styles.listTitle} onClick={this.toggleOpen}>标签</div>
                    <ul className={styles.list}>
                        {items}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tags: state.tags
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTags: () => {
            return dispatch(Actions.getAllTags())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagPostsSidebar)
