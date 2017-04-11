import React                                from 'react'
import { connect }                          from 'react-redux'
import ClassNames                           from 'classnames'
import * as styles                          from './style.scss'
import Actions                              from '../../actions'

class HomeHotTags extends React.Component {
    componentWillMount () {
        this.props.getTopTags(20)
    }

    render () {
        const items = this.props.topTags.map((tag, index) => {
            return (
                <li key={index} className={styles.tag}>
                    <a href={`/posts/tag/${tag._id}`}>{`${tag.name} (${tag.posts})`}</a>
                </li>
            )
        })
        return (
            <div className={styles.homeHotTags}>
                <div className={styles.inner}>
                    <div className={styles.sectionTitle}>热门标签</div>
                    <ul className={styles.tagItems}>
                        {items}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        topTags: state.topTags
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTopTags: (count) => {
            return dispatch(Actions.getTopTags(count))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHotTags)
