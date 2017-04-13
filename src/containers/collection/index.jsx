import React                        from 'react'
import { connect }                  from 'react-redux'
import { Link }                     from 'react-router'
import ClassNames                   from 'classnames'
import * as styles                  from './style.scss'
import randColor                    from '../../utils/randColor'
import Icon                         from '../../components/icon'
import InfiniteScroll               from 'react-infinite-scroller'
import LineLoader                   from '../../components/lineLoader'
import Actions                      from '../../actions'
import thumbPlaceholder             from '../../assets/images/thumb-placeholder.png'
import * as dateFormatter           from 'date-format'

class CollectionPage extends React.Component {
    state = {
        page: 0,
        images: 0
    }


    handleImageLoad = (img) => {
        this.setState({
            images: ++this.state.images
        })
    }

    handleLoadMore = () => {
        const key = this.getPropsCollectionsKey()
        if (this.state.images !== this.props[key].length) {
            return
        }
        this.fetchCollections(this.state.page + 1)
    }

    componentWillReceiveProps (nextProps) {
        const key = this.getPropsCollectionsKey()
        if (nextProps[key].length > this.props[key].length) {
            this.setState({
                page: ++this.state.page
            })
        }
    }

    render () {
        const collection = this.props.collection

        const items = this.props.collectionPosts.map((post, index) => {
            const tags = post.tags.map((tag, index) => {
                return (
                    <li key={index}><Link to={`/tag/${tag.slug}`}>{tag.name}</Link></li>
                )
            })
            const voters = post.voters.map((voter, index) => {
                return (
                    <li key={index}><img src={voter.avatar}/></li>
                )
            })
            const lastVoter = post.voters.length ? post.voters[post.voters.length - 1] : null
            return (
                <div key={index} className={ClassNames(styles.item, 'col-xs-12')}>
                    <div className={styles.card}>
                        <div className="row">
                            <div className={ClassNames(styles.left, 'col-md-6 col-sm-12')}>
                                <div className={styles.thumb}>
                                    <Link to={`/post/${post.id}`}>
                                        <img className={ClassNames(styles.thumbImg, styles.placeholder)} src={thumbPlaceholder} />
                                        <img className={ClassNames(styles.thumbImg, styles.preview)} src={post.featuredImage.url} />
                                    </Link>
                                </div>
                            </div>
                            <div className={ClassNames(styles.right, 'col-md-6 hidden-sm hidden-xs')}>
                                <div className={styles.infoBox}>
                                    <div className={styles.heading}>
                                        <div className={ClassNames(styles.avatar, 'pull-left')}>
                                            <Link className={styles.authorLink} to={`/u/${post.author.id}`}><img src={post.author.avatar} /></Link>
                                        </div>
                                        <div className={ClassNames(styles.title, 'pull-left')}>
                                            <h2>{post.title}</h2>
                                            <p>{`由${post.author.name}创建于${dateFormatter.asString('yyyy/MM/dd', new Date(post.createdAt))}`}</p>
                                        </div>
                                    </div>
                                    <div className={styles.tags}>
                                        <ul>{tags}</ul>
                                    </div>
                                    <div className={ClassNames(styles.userSignature, 'clearfix')}>
                                        {post.lastComment &&
                                        <div className="pull-left">
                                            <img src={post.lastComment.user.avatar} />
                                            <Link to={`/u/${post.lastComment.user.id}`}>{post.lastComment.user.name}</Link>最近留下了足迹
                                        </div>}
                                        <div className="pull-right">
                                            <span className={styles.comments}><Icon type="chat_bubble_outline" />{post.comments}</span>
                                        </div>
                                    </div>
                                    <div className={ClassNames(styles.footer, 'clearfix')}>
                                        <div className={ClassNames(styles.upvote, 'pull-left')}>
                                            <a href="javascript:;">
                                                <Icon type="arrow_drop_up" />
                                                <span className={styles.count}>{post.likes}</span>
                                            </a>
                                        </div>
                                        <div className={ClassNames(styles.voters, 'pull-left')}>
                                            <ul>{voters}</ul>
                                        </div>
                                        <div className={ClassNames(styles.stats, 'pull-left')}>
                                            {lastVoter &&
                                            <p><strong>{lastVoter.name}</strong>{`和其他${post.likes - 1}人点赞`}</p>}
                                            <p>{`${post.views}人浏览本图集`}</p>
                                        </div>
                                        <div className={ClassNames(styles.actions, 'pull-right')}>
                                            <span className="btn-primary" title="添加至收藏">+ <Icon type="turned_in_not" /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        const loader = <LineLoader style={{marginLeft: 10, marginRight: 10}} />

        return (
            <div>
                <div className={ClassNames(styles.content, styles.collection, 'clearfix')}>
                    <div className={ClassNames(styles.row, 'row')}>
                        <div className={ClassNames(styles.headLeft, 'col-md-8 col-md-offset-1')}>
                            <h1>{this.props.collection.name}</h1>
                            <div className={styles.infoBox}>
                                <div className={styles.creator}>
                                    <Link className={styles.creatorLink} to={`/u/${collection.author.id}`}><img src={collection.author.avatar} /></Link>
                                    <p>{`由${collection.author.name}创建于${dateFormatter.asString('yyyy/MM/dd', new Date(collection.createdAt))}`}</p>
                                </div>
                                <div className={styles.collectionIntro}><p>{collection.description}</p></div>
                                <div className={styles.collectionMeta}>
                                    <div className="pull-left">
                                        <span className={styles.count}>{collection.followers}</span>
                                        <span className={styles.metrics}>关注者</span>
                                    </div>
                                    <div className="pull-left">
                                        <span className={styles.count}>{collection.posts}</span>
                                        <span className={styles.metrics}>文章</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={ClassNames(styles.headRight, 'col-md-2')}>
                            <span className={ClassNames(styles.followBtn, 'btn-primary')}>关注</span>
                            <span className={ClassNames(styles.shareBtn, 'btn')}><i className="fa fa-share-alt" />分享</span>
                        </div>
                    </div>
                </div>
                <div className={styles.content}>
                    <InfiniteScroll className={ClassNames(styles.posts, styles.cards, 'row')} threshold={100} hasMore={true} initialLoad={true} loadMore={this.handleLoadMore} loader={loader}>
                        {items}
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        collection: state.collection,
        collectionPosts: state.collectionPosts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCollectionPosts: (page) => {
            return dispatch(Actions.getCollectionPosts(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage)
