import React                            from 'react'
import { Link }                         from 'react-router'
import { connect }                      from 'react-redux'
import ClassNames                       from 'classnames'
import * as styles                      from './style.scss'
import Actions                          from '../../actions'
import Masonry                          from 'react-masonry-infinite'
import randColor                        from '../../utils/randColor'
import LineLoader                       from '../lineLoader'

const sizes = [{ columns: 1, gutter: 20 },
  { mq: '768px', columns: 2, gutter: 20 },
  { mq: '1024px', columns: 3, gutter: 20 }
]

class LatestPosts extends React.Component {
    state = {
        page: 1,
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
        if (this.state.images !== this.props.latestPosts.items.length) {
            return
        }
        console.log(this.state.page)
        this.props.getLatestPosts(this.state.page)
    }

    componentWillMount () {
        // this.props.getLatestPosts()
    }

    componentWillReceiveProps (nextProps) {
        console.log('componentWillReceiveProps')
        if (nextProps.latestPosts.items.length > this.props.latestPosts.items.length) {
            this.setState({
                page: ++this.state.page
            })
        }
    }

    render () {
        const {total, items} = this.props.latestPosts
        const itemElements = items.map((post, index) => {
            return (
                <div key={index} className={ClassNames(styles.masonryBox, 'animated scaleFadeIn')} style={{width: 'calc((100% - 40px) / 3)', background: randColor()}}>
                    <div className={styles.boxInner} style={{background: randColor()}}>
                        <h2>{post.title}</h2>
                        <span className={styles.saveBtn} title="添加至收藏">+ <i className="fa fa-bookmark-o" /></span>
                        <Link className={styles.imgLink} to={`/p/${post.id}`}><img onLoad={this.handleImageLoad} srcSet="" src={post.featuredImage.url} alt="" title={post.title} /></Link>
                        <div className={styles.metabox}>
                            <Link className={styles.authorLink} to={`/user/${post.author.id}`}><img className={styles.authorAvatar} src={post.author.avatar} /><span>{post.author.nickname}</span></Link>
                            <div className={styles.counts}>
                                <em><i className="fa fa-heart" />{post.likes}</em>
                                <em><i className="fa fa-eye" />{post.views}</em>
                                <em><i className="fa fa-comments" />{post.commentsCount}</em>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        const loader = <LineLoader />

        return (
            <div className={ClassNames(styles.postsGrid, styles.latestPosts)}>
                <Masonry className={ClassNames(styles.row, styles.masonryWrap)} ref={this.referMasonry} sizes={sizes} style={{margin: '0 auto'}} pack={true} threshold={100} hasMore={total === undefined || items.length < total} loadMore={this.handleLoadMore} loader={loader}>
                    {itemElements}
                </Masonry>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        latestPosts: state.latestPosts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLatestPosts: (page) => {
            return dispatch(Actions.getLatestPosts(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LatestPosts)
