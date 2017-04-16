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

class AuthorCollectionsTab extends React.Component {
    state = {
        page: 0,
        images: 0
    }

    handleImageLoad = () => {
        this.setState({
            images: ++this.state.images
        })
    }

    handleLoadMore = () => {
        if (this.state.images !== this.props.authorCollections.length) {
            return
        }
        this.props.getAuthorCollections(this.props.author, this.state.page + 1)
    }

    componentWillMount () {
        this.handleLoadMore()
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.authorCollections.length > this.props.authorCollections.length) {
            this.setState({
                page: ++this.state.page
            })
        }

        // 路由中的id变化
        if (this.props.author !== nextProps.author) {
            this.setState({
                page: 0,
                images: 0
            })
            this.props.getAuthorCollections(this.props.author, 1)
        }
    }

    render () {
        const items = this.props.authorCollections.map((collection, index) => {
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
                    <div className={ClassNames(styles.card, styles.collectionCard)}>
                        <Link className={ClassNames(styles.collectionLink, 'clearfix')} to={`/collection/${collection.id}`}>
                            <div className={ClassNames(styles.thumb, styles.largeThumb)} style={{backgroundColor: randColor()}}>
                                <img className={ClassNames(styles.largeThumbImg, styles.preview)} onLoad={this.handleImageLoad} srcSet="" src={collection.featuredImage.url} alt="" title="" />
                                <img className={ClassNames(styles.largeThumbImg, styles.placeholder)} src={thumbPlaceholder} />
                            </div>
                            {smallThumbs}
                        </Link>
                        <div className={styles.info}>
                            <Link className={styles.authorLink} to={`/user/${collection.author.id}`}>
                                <img className={styles.authorAvatar} src={collection.author.avatar} title={collection.author.nickname} />
                            </Link>
                            <div className={styles.metabox}>
                                <h2 className={styles.name}>{collection.name}</h2>
                                <div className={styles.counts}>
                                    <span>{`${collection.postsCount} 文章`}</span>
                                    {collection.followers &&
                                    <span className={styles.point}></span>}
                                    {collection.followers &&
                                    <span>{`${collection.followers} 关注`}</span>}
                                </div>
                            </div>
                            {/* <span className={ClassNames(styles.followBtn, 'btn-following')} style={{paddingLeft: 12, paddingRight: 12}}>已关注</span> */}
                            <span className={ClassNames(styles.followBtn, 'btn-primary')}>关注</span>
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
        authorCollections: state.authorCollections
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAuthorCollections: (id, page) => {
            return dispatch(Actions.getAuthorCollections(id, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorCollectionsTab)
