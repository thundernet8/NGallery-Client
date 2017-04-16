import React                        from 'react'
import { connect }                  from 'react-redux'
import { Link }                     from 'react-router'
import ClassNames                   from 'classnames'
import * as styles                  from '../../containers/author/style.scss'
import randColor                    from '../../utils/randColor'
import Icon                         from '../../components/icon'
import InfiniteScroll               from 'react-infinite-scroller'
import LineLoader                   from '../../components/lineLoader'
import Actions                      from '../../actions'
import thumbPlaceholder             from '../../assets/images/thumb-placeholder.png'
import * as dateFormatter           from 'date-format'
import Spinner                      from '../../components/spinner'

// 包括用户Posts/用户Share Photos/用户点赞的Posts
class AuthorPostsTab extends React.Component {
    state = {
        page: 0,
        images: 0
    }

    getItems = (props) => {
        props = props || this.props
        switch (props.tab) {
            case 'share':
                return props.authorShare
            case 'likes':
                return props.authorLikes
            default:
                return props.authorPosts
        }
    }

    fetchItems = (page, props = null) => {
        props = props || this.props
        switch (props.tab) {
            case 'share':
                return this.props.getAuthorShare(props.author, this.state.order, page)
            case 'likes':
                return this.props.getAuthorLikes(props.author, this.state.order, page)
            default:
                return this.props.getAuthorPosts(props.author, this.state.order, page)
        }
    }

    handleImageLoad = () => {
        this.setState({
            images: ++this.state.images
        })
    }

    handleLoadMore = () => {
        const items = this.getItems()
        if (this.state.images !== items.length) {
            return
        }
        this.fetchItems(this.state.page + 1)
    }

    componentWillMount () {
        this.handleLoadMore()
    }

    componentWillReceiveProps (nextProps) {
        if (this.getItems(nextProps).length > this.getItems().length) {
            this.setState({
                page: ++this.state.page
            })
        }

        // 路由中的tab和id变化
        if ((this.props.tab !== nextProps.tab) || (this.props.author !== nextProps.author)) {
            this.setState({
                page: 0,
                images: 0
            })
            this.fetchItems(1, nextProps)
        }
        if (this.props.order !== nextProps.order) {
            this.setState({
                page: 1,
                images: 0
            })
            this.fetchItems(1, nextProps)
        }
    }

    render () {
        const items = this.getItems().map((item, index) => {
            return (
                <div key={index} className="col-md-4 col-sm-4 col-sm-6 col-xs-12">
                    <div className={ClassNames(styles.card, styles.postCard)} style={{backgroundColor: randColor()}}>
                        <div className={styles.body}>
                            <span className={styles.saveBtn} title="添加至收藏">+ <Icon type="turned_in_not" /></span>
                            <Link className={styles.postLink} to={`/post/${item.id}`}>
                                <img onLoad={this.handleImageLoad} srcSet="" src={item.featuredImage.url} alt="" title={item.title} /></Link>
                            <div className={styles.metabox}>
                                <div className={styles.counts}>
                                    <em><Icon type="favorite_border" />{item.likes}</em>
                                    <em><Icon type="visibility" />{item.views}</em>
                                    <em><Icon type="chat_bubble_outline" />{item.commentsCount}</em>
                                </div>
                            </div>
                        </div>
                        <div className={styles.footer}>
                            <Link className={styles.authorLink} to={`/user/${item.author.id}`}>
                                <img className={styles.authorAvatar} src={item.author.avatar} title={item.author.nickname} />
                            </Link>
                            <h2>{item.title}</h2>
                            <p>
                                由<Link to={`/user/${item.author.id}`}>{item.author.nickname}</Link>发布于<span className={styles.postDate}>{dateFormatter.asString('yyyy-MM-dd', new Date(item.createdAt))}</span>
                            </p>
                        </div>
                    </div>
                </div>
            )
        })

        const loader = <LineLoader style={{marginLeft: 10, marginRight: 10}} />

        return (
            <div className={styles.cards}>
                <InfiniteScroll className={'row'} threshold={100} hasMore={true} initialLoad={false} loadMore={this.handleLoadMore} loader={loader}>
                    {items}
                </InfiniteScroll>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authorPosts: state.authorPosts,
        authorShare: state.authorShare,
        authorLikes: state.authorLikes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAuthorPosts: (uid, order, page) => {
            return dispatch(Actions.getAuthorPosts(uid, order, page))
        },
        getAuthorShare: (uid, order, page) => {
            return dispatch(Actions.getAuthorShare(uid, order, page))
        },
        getAuthorLikes: (uid, order, page) => {
            return dispatch(Actions.getAuthorLikes(uid, order, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPostsTab)
