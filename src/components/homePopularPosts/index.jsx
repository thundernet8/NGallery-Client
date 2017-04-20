import React                            from 'react'
import { Link }                         from 'react-router'
import { connect }                      from 'react-redux'
import ClassNames                       from 'classnames'
import * as styles                      from './style.scss'
import Actions                          from '../../actions'
import Masonry                          from 'react-masonry-infinite'
import randColor                        from '../../utils/randColor'
import Icon                             from '../icon'
import LineLoader                       from '../lineLoader'

const sizes = [{ columns: 1, gutter: 20 },
  { mq: '768px', columns: 2, gutter: 20 },
  { mq: '1024px', columns: 3, gutter: 20 }
]

class HomePopularPosts extends React.Component {
    state = {
        page: 0,
        images: 0
    }

    referMasonry = (component) => {
        this.masonry = component
    }

    handleImageLoad = (img) => {
        this.setState({
            images: ++this.state.images
        })
        this.masonry && this.masonry.state.instance.pack() // TODO 优化
    }

    handleLoadMore = () => {
        if (this.state.images !== this.props.homePopularPosts.items.length) {
            return
        }
        this.props.getPopularPosts(this.state.page + 1)
    }

    componentWillMount () {
        // this.props.getPopularPosts()
    }

    componentWillReceiveProps (nextProps) {
        console.log('componentWillReceiveProps')
        if (nextProps.homePopularPosts.items.length > this.props.homePopularPosts.items.length) {
            this.setState({
                page: ++this.state.page
            })
        }
    }

    render () {
        const {total, items} = this.props.homePopularPosts
        const itemElements = items.map((post, index) => {
            return (
                <div key={index} className={ClassNames(styles.masonryBox, 'animated scaleFadeIn')} style={{width: 'calc((100% - 40px) / 3)', background: randColor()}}>
                    <div className={styles.boxInner} style={{background: randColor()}}>
                        <h2>{post.title}</h2>
                        <span className={styles.saveBtn} title="添加至收藏">+ <Icon type="turned_in_not" /></span>
                        <Link className={styles.imgLink} to={`/p/${post.id}`}><img onLoad={this.handleImageLoad} srcSet="" src={post.featuredImage.url} alt="" title={post.title} /></Link>
                        <div className={styles.metabox}>
                            <Link className={styles.authorLink} to={`/user/${post.author.id}`}><img className={styles.authorAvatar} src={post.author.avatar} /><span>{post.author.nickname}</span></Link>
                            <div className={styles.counts}>
                                <em><Icon type="favorite_border" />{post.likes}</em>
                                <em><Icon type="visibility" />{post.views}</em>
                                <em><Icon type="chat_bubble_outline" />{post.commentsCount}</em>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        const loader = <LineLoader />

        return (
            <div className={styles.homePosts}>
                <Masonry className={ClassNames(styles.row, styles.masonryWrap)} ref={this.referMasonry} initialLoad={true} sizes={sizes} style={{margin: '0 auto'}} pack={true} threshold={100} hasMore={total === undefined || items.length < total} loadMore={this.handleLoadMore} loader={loader}>
                    {itemElements}
                </Masonry>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        homePopularPosts: state.homePopularPosts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPopularPosts: (page) => {
            return dispatch(Actions.getHomePopularPosts(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePopularPosts)
