import React                        from 'react'
import { connect }                  from 'react-redux'
import { Link }                     from 'react-router'
import ClassNames                   from 'classnames'
import * as styles                  from './style.scss'
import randColor                    from '../../utils/randColor'
import InfiniteScroll               from 'react-limited-infinite-scroll'
import LineLoader                   from '../../components/lineLoader'
import Actions                      from '../../actions'
import thumbPlaceholder             from '../../assets/images/thumb-placeholder.png'
import * as dateFormatter           from 'date-format'
import Spinner                      from '../../components/spinner'
import { getUrlQuery }              from '../../utils/url'

class SearchResultsPage extends React.Component {
    state = {
        page: 0,
        images: 0,
        type: 'post'
    }

    changeType = (type) => {
        if (type === this.state.type) {
            return
        }
        type = ['post', 'share'].indexOf(type) > -1 ? type : 'post'
        this.setState({
            type: type,
            images: 0,
            page: 0
        })
        this.props.getSearchResults(getUrlQuery('q', this.props.location.search), type, 1)
    }

    handleImageLoad = () => {
        this.setState({
            images: ++this.state.images
        })
    }

    handleLoadMore = () => {
        if (this.state.images > 0 && this.state.images !== this.props.searchResult.items.length) {
            return
        }
        this.props.getSearchResults(getUrlQuery('q', this.props.location.search), this.state.type, this.state.page + 1)
    }

    componentWillMount () {
        this.handleLoadMore()
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            page: Math.ceil(nextProps.searchResult.items.length / 12)
        })
        if (nextProps.location.search !== this.props.location.search) {
            this.setState({
                page: 0,
                images: 0
            })
            this.props.getSearchResults(getUrlQuery('q', nextProps.location.search), this.state.type, 1)
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        if (nextProps.location.search !== this.props.location.search || nextState.type !== this.state.type || nextState.page !== this.state.page) {
            return true
        }
        return false
    }

    render () {
        if (!this.props.searchResult) {
            return (
                <div className={styles.spinnerWrap}><Spinner size={60} thickness={2} /></div>
            )
        }

        const {total, items} = this.props.searchResult
        const itemElements = items.map((item, index) => {
            return (
                <div key={index} className={ClassNames(styles.item, 'col-lg-4 col-md-4 col-sm-6 col-xs-12')}>
                    <div className={styles.card} style={{backgroundColor: randColor()}}>
                        <div className={styles.body}>
                            <span className={styles.saveBtn} title="添加至收藏">+ <i className="fa fa-bookmark-o" /></span>
                            <Link className={styles.postLink} to={`/post/${item.id}`}>
                                <img onLoad={this.handleImageLoad} srcSet="" src={item.featuredImage.url} alt="" title={item.title} /></Link>
                            <div className={styles.metabox}>
                                <div className={styles.counts}>
                                    <em><i className="fa fa-heart" />{item.likes}</em>
                                    <em><i className="fa fa-eye" />{item.views}</em>
                                    <em><i className="fa fa-comments" />{item.commentsCount}</em>
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

        const loader = <LineLoader style={{marginLeft: 10, marginRight: 10, marginBottom: 30}} />

        return (
            <div className={styles.content}>
                <div className="clearfix">
                    <div className={ClassNames(styles.resultInfo, 'pull-left')}>
                        <span>{`共 ${total} 条结果`}</span>
                    </div>
                    <div className={ClassNames(styles.typeMenu, 'pull-right')}>
                        <ul>
                            <li className={ClassNames({[styles.active]: this.state.type === 'post'})}><a href="javascript:;" onClick={this.changeType.bind(null, 'post')}>图集</a></li>
                            <li className={ClassNames({[styles.active]: this.state.type === 'share'})}><a href="javascript:;" onClick={this.changeType.bind(null, 'share')}>分享</a></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.itemList}>
                    <InfiniteScroll className={ClassNames(styles.cards, 'row')} limit={5} threshold={100} hasMore={total === undefined || items.length < total} autoLoad={false} loadNext={this.handleLoadMore} spinLoader={loader}>
                        {itemElements}
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchResult: state.searchResult
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSearchResults: (key, type, page) => {
            return dispatch(Actions.getSearchResults(key, type, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage)
