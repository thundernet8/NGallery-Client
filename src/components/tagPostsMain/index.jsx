import React                        from 'react'
import { connect }                  from 'react-redux'
import { Link }                     from 'react-router'
import ClassNames                   from 'classnames'
import * as styles                  from './style.scss'
import Actions                      from '../../actions'
import randColor                    from '../../utils/randColor'
import Icon                         from '../icon'
import InfiniteScroll               from 'react-infinite-scroller'
import LineLoader                   from '../lineLoader'

class TagPostsMain extends React.Component {
    state = {
        order: 'latest',
        page: 0,
        images: 0
    }

    changeOrder = (order) => {
        if (order === this.state.order) {
            return
        }
        order = ['latest', 'popular'].indexOf(order) > -1 ? order : 'latest'
        this.setState({
            order: order
        })
        this.props.getTagPosts(this.props.tag, this.state.order, 1)
    }

    handleImageLoad = (img) => {
        this.setState({
            images: ++this.state.images
        })
    }

    handleLoadMore = () => {
        if (this.state.images !== this.props.tagPosts.length) {
            return
        }
        this.props.getTagPosts(this.props.tag, this.state.order, this.state.page + 1)
    }

    // componentWillMount () {
    //     this.props.getTagPosts(this.props.tag, this.state.order, 1)
    // }

    componentWillReceiveProps (nextProps) {
        if (nextProps.tag !== this.props.tag) {
            console.log('tag change')
            this.props.getTagPosts(this.props.tag, this.state.order, 1)
        }
        if (nextProps.tagPosts.length > this.props.tagPosts.length) {
            this.setState({
                page: ++this.state.page
            })
        }
    }

    render () {
        const items = this.props.tagPosts.map((post, index) => {
            return (
                <div key={index} className={ClassNames(styles.postItem, 'col-xl-3 col-lg-4 col-sm-6 col-xs-12')}>
                    <div className={styles.inner} style={{backgroundColor: randColor()}}>
                        <span className={styles.saveBtn} title="添加至收藏">+ <Icon type="turned_in_not" /></span>
                        <Link className={styles.postLink} to={`/post/${post._id}`}>
                            <img onLoad={this.handleImageLoad} src={post.featuredImage.url} />
                            <div className={styles.counts}>
                                <em><Icon type="favorite_border" />{post.likes}</em>
                                <em><Icon type="visibility" />{post.views}</em>
                                <em><Icon type="chat_bubble_outline" />{post.comments}</em>
                            </div>
                        </Link>
                        <div className={styles.postInfo}>
                            <Link className={styles.authorLink} to={`/u/${post.author._id}`}>
                                <img className={styles.authorAvatar} src={post.author.avatar} title={post.author.name} />
                            </Link>
                            <h2>{post.title}</h2>
                            <p>
                                由<Link to={`/u/${post.author._id}`}>{post.author.name}</Link>发布于<span className={styles.postDate}>{(new Date(post.createdAt)).toDateString()}</span>
                            </p>
                        </div>
                    </div>
                </div>
            )
        })

        const loader = <LineLoader style={{marginLeft: 10, marginRight: 10}} />

        return (
            <div className={ClassNames(styles.main, 'col-md-10 col-sm-8')}>
                <div className="clearfix"/>
                <div className={styles.postList}>
                    <InfiniteScroll className={ClassNames(styles.cards, 'row')} threshold={100} hasMore={true} initialLoad={true} loadMore={this.handleLoadMore} loader={loader}>
                        {items}
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tagPosts: state.tagPosts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTagPosts: (tag, order, page) => {
            return dispatch(Actions.getTagPosts(tag, order, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagPostsMain)
