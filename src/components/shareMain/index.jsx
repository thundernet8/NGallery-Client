import React                        from 'react'
import { connect }                  from 'react-redux'
import { Link }                     from 'react-router'
import ClassNames                   from 'classnames'
import * as styles                  from '../../containers/share/style.scss'
import Actions                      from '../../actions'
import randColor                    from '../../utils/randColor'
import Icon                         from '../icon'
import InfiniteScroll               from 'react-limited-infinite-scroll'
import LineLoader                   from '../lineLoader'
import Spinner                      from '../spinner'
import * as dateFormatter           from 'date-format'
import dataImage                    from '../../utils/dataImage'

class ShareListMain extends React.Component {
    state = {
        order: 'latest',
        page: 0,
        images: 0
    }

    changeOrder = (order) => {
        if (order === this.state.order) {
            return
        }
        order = ['latest', 'popular', 'toplike', 'random'].indexOf(order) > -1 ? order : 'latest'
        this.setState({
            order: order,
            images: 0,
            page: 0
        })
        this.props.getShareList(order, 1)
    }

    handleImageLoad = (img) => {
        this.setState({
            images: ++this.state.images
        })
    }

    handleLoadMore = () => {
        if (this.state.images !== this.props.shareList.items.length) {
            return
        }
        this.props.getShareList(this.state.order, this.state.page + 1)
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.shareList.items.length > this.props.shareList.items.length) {
            this.setState({
                page: ++this.state.page
            })
        }
    }

    render () {
        const {total, items} = this.props.shareList
        const itemElements = items.map((share, index) => {
            return (
                <div key={index} className={ClassNames(styles.shareItem)}>
                    <div className={styles.inner}>
                        <div className={styles.header}>
                            <h2>{share.title}</h2>
                        </div>
                        <div className={styles.thumbWrap}>
                            <img className={styles.placeholder} src={dataImage(share.featuredImage.width, share.featuredImage.height)} />
                            <img className={styles.preview} onLoad={this.handleImageLoad} srcSet="" src={share.featuredImage.url} />
                        </div>
                        <div className={ClassNames(styles.footer, 'clearfix')}>
                            <div className="pull-left">
                                <span className={styles.date}><Icon type="schedule" />{dateFormatter.asString('yyyy-MM-dd', new Date(share.createdAt))}</span>
                                <span className={styles.author}><Icon type="perm_identity" /><Link to={`/user/${share.author.id}`}>{share.author.nickname}</Link></span>
                            </div>
                            <div className="pull-right">
                                <span className={styles.views}><Icon type="visibility" />{share.views}</span>
                                <span className={styles.likes}><Icon type="favorite_border" />{share.likes}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        const spinLoader = <Spinner className={styles.spinLoader} size={50} thickness={3} /> // <LineLoader style={{marginLeft: 10, marginRight: 10}} />
        const mannualLoader = <div className={styles.manualLoader}><a href="javascript:;">加载更多</a></div>

        return (
            <div className={ClassNames(styles.main, 'col-md-8 col-sm-6')}>
                <div className="clearfix">
                    <div className={ClassNames(styles.orderMenu, 'pull-right')}>
                        <ul>
                            <li className={ClassNames({[styles.active]: this.state.order === 'latest'})}><a href="javascript:;" onClick={this.changeOrder.bind(null, 'latest')}>最新</a></li>
                            <li className={ClassNames({[styles.active]: this.state.order === 'popular'})}><a href="javascript:;" onClick={this.changeOrder.bind(null, 'popular')}>热门</a></li>
                            <li className={ClassNames({[styles.active]: this.state.order === 'toplike'})}><a href="javascript:;" onClick={this.changeOrder.bind(null, 'toplike')}>最赞</a></li>
                            <li className={ClassNames({[styles.active]: this.state.order === 'random'})}><a href="javascript:;" onClick={this.changeOrder.bind(null, 'random')}>随机</a></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.shareList}>
                    <InfiniteScroll className={ClassNames(styles.cards, 'row')} limit={2} threshold={100} hasMore={total === undefined || items.length < total} autoLoad={true} loadNext={this.handleLoadMore} spinLoader={spinLoader} mannualLoader={mannualLoader}>
                        {itemElements}
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        shareList: state.shareList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getShareList: (order, page) => {
            return dispatch(Actions.getShareList(order, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareListMain)
