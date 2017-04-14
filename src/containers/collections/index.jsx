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

class CollectionsPage extends React.Component {
    state = {
        page: 0,
        images: 0
    }

    getFilter = (props = null) => {
        props = props || this.props
        const availableFilters = ['all', 'mine', 'following']
        const filter = props.params ? props.params.filter : null
        return availableFilters.indexOf(filter) > -1 ? filter : 'all'
    }

    getPropsCollectionsKey = (props = null) => {
        const filter = this.getFilter(props)
        switch (filter) {
            case 'following':
                return 'followingCollections'
            case 'mine':
                return 'myCollections'
            default:
                return 'collections'
        }
    }

    fetchCollections = (page, props = null) => {
        const filter = this.getFilter(props)
        switch (filter) {
            case 'following':
                return this.props.getFollowingCollections(page)
            case 'mine':
                return this.props.getMyCollections(page)
            default:
                return this.props.getAllCollections(page)
        }
    }

    handleCreateCollection = () => {
        // TODO
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

        // 路由中的filter变化
        if ((nextProps.params && (!this.props.params || this.props.params.filter !== nextProps.params.filter)) ||
        (!nextProps.params && this.props.params)) {
            console.log(this.props.params)
            console.log(nextProps.params)
            this.setState({
                page: 0,
                images: 0
            })
            this.fetchCollections(1, nextProps)
        }
    }

    render () {
        const key = this.getPropsCollectionsKey()
        const items = this.props[key].map((collection, index) => {
            const smallThumbs = collection.smallThumbs.map((smallThumb, index) => {
                return (
                    <div key={index} className={ClassNames(styles.thumb, styles.smallThumb)} style={{backgroundColor: randColor()}}>
                        <img className={ClassNames(styles.smallThumbImg, styles.preview)} srcSet="" src={smallThumb.url} alt="" title="" />
                        <img className={ClassNames(styles.smallThumbImg, styles.placeholder)} src={thumbPlaceholder} />
                    </div>
                )
            })
            return (
                <div key={index} className={ClassNames(styles.item, 'col-lg-4 col-md-4 col-sm-6 col-xs-12')}>
                    <div className={styles.card}>
                        <Link className={ClassNames(styles.imgLink, 'clearfix')} to={`/collection/${collection.id}`}>
                            <div className={ClassNames(styles.thumb, styles.largeThumb)} style={{backgroundColor: randColor()}}>
                                <img className={ClassNames(styles.largeThumbImg, styles.preview)} onLoad={this.handleImageLoad} srcSet="" src={collection.featuredImage.url} alt="" title="" />
                                <img className={ClassNames(styles.largeThumbImg, styles.placeholder)} src={thumbPlaceholder} />
                            </div>
                            {smallThumbs}
                        </Link>
                        <div className={styles.info}>
                            <Link className={styles.authorLink} to={`/u/${collection.author.id}`}>
                                <img className={styles.authorAvatar} src={collection.author.avatar} title={collection.author.name} />
                            </Link>
                            <div className={styles.metabox}>
                                <h2 className={styles.name}>{collection.name}</h2>
                                <div className={styles.counts}>
                                    <span>{`${collection.posts} 文章`}</span>
                                    {collection.followers &&
                                    <span className={styles.point}></span>}
                                    {collection.followers &&
                                    <span>{`${collection.followers} 关注`}</span>}
                                </div>
                            </div>
                            {this.props.params && this.props.params.filter === 'following' &&
                            <span className={ClassNames(styles.followBtn, 'btn-following')} style={{paddingLeft: 12, paddingRight: 12}}>已关注</span>}
                            {(!this.props.params || ['following', 'mine'].indexOf(this.props.params.filter) < 0) &&
                            <span className={ClassNames(styles.followBtn, 'btn-primary')}>关注</span>}
                        </div>
                    </div>
                </div>
            )
        })

        const loader = <LineLoader style={{marginLeft: 10, marginRight: 10}} />

        return (
            <div>
                {this.props.filter === 'following' &&
                <div className={styles.banner}>
                    <div className={styles.content}>
                        <h1>关注的收藏夹</h1>
                        <div>
                            <Link href="javascript:;" className={ClassNames('btn-primary', styles.bannerBtn)}>探索精选收藏夹</Link>
                        </div>
                    </div>
                </div>}
                {this.props.filter === 'mine' &&
                <div className={styles.banner}>
                    <div className={styles.content}>
                        <h1>我的收藏夹</h1>
                        <div>
                            <a href="javascript:;" className={ClassNames('btn-primary', styles.bannerBtn)} onClick={this.handleCreateCollection()}>创建新的收藏夹</a>
                        </div>
                    </div>
                </div>}
                {this.props.filter === 'following' &&
                <div className={styles.banner}>
                    <div className={styles.content}>
                        <h1>精选收藏夹</h1>
                        <p>每日由社区人气推荐更新</p>
                        <div>
                            <a href="javascript:;" className={ClassNames('btn-primary', styles.bannerBtn)} onClick={this.handleCreateCollection()}>创建我的收藏夹</a>
                        </div>
                    </div>
                </div>}
                <div className={styles.content}>
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
        collections: state.collections,
        followingCollections: state.followingCollections,
        myCollections: state.myCollections
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCollections: (page) => {
            return dispatch(Actions.getAllCollections(page))
        },
        getFollowingCollections: (page) => {
            return dispatch(Actions.getFollowingCollections(page))
        },
        getMyCollections: (page) => {
            return dispatch(Actions.getMyCollections(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsPage)
