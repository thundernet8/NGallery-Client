import React                                from 'react'
import { Link }                             from 'react-router'
import { connect }                          from 'react-redux'
import ClassNames                           from 'classnames'
import * as styles                          from './style.scss'
import defaultAvatar                        from '../../assets/images/avatar.png'
import Icon                                 from '../icon'
import randColor                            from '../../utils/randColor'
import Actions                              from '../../actions'

// 分别选出昨日/上周/过去一月热门的第一篇文章
class HomeFeatured extends React.Component {
    componentWillMount () {
        this.props.getFeaturedPosts()
    }

    render () {
        const items = this.props.featuredPosts.map((post, index) => {
            return (
                <div key={index} className={ClassNames(styles.item, 'col-lg-4 col-md-4 col-sm-6 col-xs-12')}>
                    <div className={styles.card} style={{backgroundColor: randColor()}}>
                        <h2>{post.title}</h2>
                        <span className={styles.saveBtn} title="添加至收藏">+ <Icon type="turned_in_not" /></span>
                        <Link className={styles.imgLink} to={`/p/${post._id}`}><img srcSet="" src={post.featuredImage.url} alt="" title={post.title} /></Link>
                        <div className={styles.metabox}>
                            <Link className={styles.authorLink} to={`/u/${post.author._id}`}><img className={styles.authorAvatar} src={post.author.avatar} /><span>{post.author.name}</span></Link>
                            <div className={styles.counts}>
                                <em><Icon type="favorite_border" />{post.likes}</em>
                                <em><Icon type="visibility" />{post.views}</em>
                                {/* <em><Icon type="turned_in_not" />8</em> favorites count */}
                                <em><Icon type="chat_bubble_outline" />{post.comments}</em>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className={styles.HomeFeatured}>
                <div className={ClassNames(styles.sectionHeader, 'clearfix')}>
                    <div className={styles.heading}>
                        <h3>热门精选</h3>
                    </div>
                </div>
                <div className={ClassNames(styles.row, 'row')}>
                    {items}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        featuredPosts: state.featuredPosts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFeaturedPosts: () => {
            return dispatch(Actions.getFeaturedPosts())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeatured)
