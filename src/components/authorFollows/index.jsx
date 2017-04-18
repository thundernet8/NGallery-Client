import React                        from 'react'
import { connect }                  from 'react-redux'
import { Link }                     from 'react-router'
import ClassNames                   from 'classnames'
import * as styles                  from '../../containers/author/style.scss'
import randColor                    from '../../utils/randColor'
import Icon                         from '../../components/icon'
import InfiniteScroll               from 'react-limited-infinite-scroll'
import LineLoader                   from '../../components/lineLoader'
import Actions                      from '../../actions'
import thumbPlaceholder             from '../../assets/images/thumb-placeholder.png'
import * as dateFormatter           from 'date-format'
import Spinner                      from '../../components/spinner'

// 包含关注者与被关注者
class AuthorFollowsTab extends React.Component {
    state = {
        page: 0
    }

    getItems = (props) => {
        props = props || this.props
        switch (props.tab) {
            case 'following':
                return props.authorFollowing
            default:
                return props.authorFollowers
        }
    }

    fetchItems = (page, props = null) => {
        props = props || this.props
        switch (props.tab) {
            case 'following':
                return this.props.getAuthorFollowing(props.author, page)
            default:
                return this.props.getAuthorFollowers(props.author, page)
        }
    }

    handleLoadMore = () => {
        this.fetchItems(this.state.page + 1)
    }

    componentWillMount () {
        this.handleLoadMore()
    }

    componentWillReceiveProps (nextProps) {
        const length = this.getItems(nextProps).items.length
        if (length) {
            this.setState({
                page: Math.ceil(length / 12)
            })
        }

        // 路由中的tab和id变化
        if ((this.props.tab !== nextProps.tab) || (this.props.author !== nextProps.author)) {
            this.setState({
                page: 0
            })
            this.fetchItems(1, nextProps)
        }
    }

    render () {
        const {total, items} = this.getItems()
        const itemElements = items.map((item, index) => {
            const stats = item.followersCount ? `${item.followersCount} 粉丝 - ${item.followingCount} 关注` : `${item.followingCount} 关注`
            return (
                <div key={index} className="col-md-4 col-sm-4 col-sm-6 col-xs-12">
                    <div className={ClassNames(styles.card, styles.followCard)}>
                        <div className={styles.banner} style={{backgroundColor: randColor()}}/>
                        <div className={styles.avatar}>
                            <Link to={`/user/${item.id}`}><img src={item.avatar} /></Link>
                        </div>
                        <div className={styles.name}><Link to={`/user/${item.id}`}>{item.nickname}</Link></div>
                        <div className={styles.stats}>{stats}</div>
                        <div className={styles.bio}>{item.bio}</div>
                        {(!this.props.user.id || this.props.user.id !== this.props.author) &&
                        <div className={styles.follow}><a href="javascript:;" className="btn-primary">关注</a></div>}
                    </div>
                </div>
            )
        })

        const loader = <LineLoader style={{marginLeft: 10, marginRight: 10, marginBottom: 30}} />

        return (
            <div className={styles.cards}>
                <InfiniteScroll className={'row'} limit={5} threshold={100} hasMore={total === undefined || items.length < total} autoLoad={false} loadNext={this.handleLoadMore} spinLoader={loader}>
                    {itemElements}
                </InfiniteScroll>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        authorFollowers: state.authorFollowers,
        authorFollowing: state.authorFollowing
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAuthorFollowers: (id, page) => {
            return dispatch(Actions.getAuthorFollowers(id, page))
        },
        getAuthorFollowing: (id, page) => {
            return dispatch(Actions.getAuthorFollowing(id, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorFollowsTab)
