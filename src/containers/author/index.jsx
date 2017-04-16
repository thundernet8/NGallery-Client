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
import Spinner                      from '../../components/spinner'
import AuthorPostsTab               from '../../components/authorPosts'
import AuthorCollectionsTab         from '../../components/authorCollections'
import AuthorFollowsTab             from '../../components/authorFollows'

class AuthorPage extends React.Component {
    state = {
        page: 0,
        images: 0,
        order: 'popular'
    }

    changeOrder = (order) => {
        if (order === this.state.order) {
            return
        }
        order = ['latest', 'popular'].indexOf(order) > -1 ? order : 'latest'
        this.setState({
            order: order,
            images: 0,
            page: 0
        })
        // this.props.getCollectionPosts(this.props.params.id, order, 1)
    }

    getTab = (props) => {
        props = props || this.props
        const tabKey = props.params && props.params.tab ? props.params.tab : 'posts'
        switch (tabKey) {
            case 'posts':
            case 'share':
            case 'likes':
                return AuthorPostsTab
            case 'collections':
                return AuthorCollectionsTab
            case 'followers':
            case 'following':
                return AuthorFollowsTab
            default:
                return null
        }
    }

    componentWillMount () {
        this.props.getAuthor(this.props.params.id)
    }

    render () {
        const author = this.props.author
        if (!author) {
            return (
                <div className={styles.spinnerWrap}><Spinner size={60} thickness={2} /></div>
            )
        }
        const usualTags = author.usualTags.map((tag, index) => {
            return (
                <li key={index}>{tag.name}</li>
            )
        })

        const Tab = this.getTab()
        return (
            <div className={styles.content}>
                <div className={styles.userCard}>
                    <div className={styles.userStatsWrap}>
                        <ul className={styles.userUsualTags}>{usualTags}</ul>
                    </div>
                    <div className={styles.userCardInfo}>
                        <div className={styles.userCardAvatar}>
                            <Link to={`/user/${author.id}`}><img src={author.avatar} /></Link>
                        </div>
                        <div className={styles.userCardName}>
                            <h1>{author.nickname}<small>{`#${author.id}`}</small></h1>
                        </div>
                        {author.bio &&
                        <div className={styles.userCardBio}>
                            <p>{author.bio}</p>
                        </div>}
                        <ul className={styles.socialItems}>
                            <li className={styles.socialItemWebsite}>
                                <a href={author.site} target="_blank" title="Website"><i className="fa fa-globe"/></a>
                            </li>
                        </ul>
                        {!this.props.user || !this.props.user.id || this.props.user.id !== this.props.author.id}
                        <div className={styles.followActions}>
                            <a href="javascript:;" className={ClassNames(styles.followBtn, 'btn-primary')}>关注</a>
                        </div>
                    </div>
                    <div className={ClassNames(styles.userCardNavs, 'row')}>
                        <div className="col-xs-4 col-sm-2">
                            <Link to={`/user/${author.id}`} activeClassName={styles.active}><strong>{author.postsCount}</strong>文章</Link>
                        </div>
                        <div className="col-xs-4 col-sm-2">
                            <Link to={`/user/${author.id}/share`} activeClassName={styles.active}><strong>{author.sharesCount}</strong>分享</Link>
                        </div>
                        <div className="col-xs-4 col-sm-2">
                            <Link to={`/user/${author.id}/likes`} activeClassName={styles.active}><strong>{author.likesCount}</strong>点赞</Link>
                        </div>
                        <div className="col-sm-2 hidden-xs">
                            <Link to={`/user/${author.id}/collections`} activeClassName={styles.active}><strong>{author.collectionsCount}</strong>收藏夹</Link>
                        </div>
                        <div className="col-sm-2 hidden-xs">
                            <Link to={`/user/${author.id}/followers`} activeClassName={styles.active}><strong>{author.followersCount}</strong>粉丝</Link>
                        </div>
                        <div className="col-sm-2 hidden-xs">
                            <Link to={`/user/${author.id}/following`} activeClassName={styles.active}><strong>{author.followingCount}</strong>关注</Link>
                        </div>
                    </div>
                </div>
                {(!this.props.params.tab || this.props.params.tab === 'share' || this.props.params.tab === 'likes') &&
                <div className="clearfix">
                    <div className={ClassNames(styles.orderMenu, 'pull-right')}>
                        <ul>
                            <li className={ClassNames({[styles.active]: this.state.order === 'latest'})}><a href="javascript:;" onClick={this.changeOrder.bind(null, 'latest')}>最新</a></li>
                            <li className={ClassNames({[styles.active]: this.state.order === 'popular'})}><a href="javascript:;" onClick={this.changeOrder.bind(null, 'popular')}>热门</a></li>
                        </ul>
                    </div>
                </div>
                }
                <div className={styles.itemList}>
                    {Tab &&
                    <Tab order={this.state.order} tab={this.props.params.tab ? this.props.params.tab : 'posts'} author={this.props.params.id}/>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        author: state.author
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAuthor: (id) => {
            return dispatch(Actions.getAuthor(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage)
