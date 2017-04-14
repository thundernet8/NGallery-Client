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
        if (this.state.images !== this.props.latestPosts.length) {
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
        if (nextProps.latestPosts.length > this.props.latestPosts.length) {
            this.setState({
                page: ++this.state.page
            })
        }
    }

    render () {
        const items = this.props.latestPosts.map((post, index) => {
            return (
                <div key={index} className={ClassNames(styles.masonryBox, 'animated scaleFadeIn')} style={{width: 'calc((100% - 40px) / 3)', background: randColor()}}>
                    <div className={styles.boxInner} style={{background: randColor()}}>
                        <h2>{post.title}</h2>
                        <span className={styles.saveBtn} title="添加至收藏">+ <Icon type="turned_in_not" /></span>
                        <Link className={styles.imgLink} to={`/p/${post.id}`}><img onLoad={this.handleImageLoad} srcSet="" src={post.featuredImage.url} alt="" title={post.title} /></Link>
                        <div className={styles.metabox}>
                            <Link className={styles.authorLink} to={`/u/${post.author.id}`}><img className={styles.authorAvatar} src={post.author.avatar} /><span>{post.author.name}</span></Link>
                            <div className={styles.counts}>
                                <em><Icon type="favorite_border" />{post.likes}</em>
                                <em><Icon type="visibility" />{post.views}</em>
                                <em><Icon type="chat_bubble_outline" />{post.comments}</em>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        const loader = <LineLoader />

        return (
            <div className={ClassNames(styles.postsGrid, styles.latestPosts)}>
                <Masonry className={ClassNames(styles.row, styles.masonryWrap)} ref={this.referMasonry} sizes={sizes} style={{margin: '0 auto'}} pack={true} threshold={100} hasMore={true} loadMore={this.handleLoadMore} loader={loader}>
                    {items}
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
