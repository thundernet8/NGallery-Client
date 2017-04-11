import React, { PropTypes }                                 from 'react'
import { connect }                                          from 'react-redux'
import ClassNames                                           from 'classnames'
import Headroom                                             from 'react-headroom'
import * as styles                                          from './style.scss'
import logo                                                 from '../../assets/images/logo.png'
import HeadSearchBox                                        from './headSearchBox'
import SubmitMenu                                           from './submitMenu'
import UserMenu                                             from './userMenu'
import MoreMenu                                             from './moreMenu'
import Actions                                              from '../../actions'
import appConfig                                            from '../../../config'
import { Link }                                             from 'react-router'
import CategoryMenu                                         from './categoryMenu'
import CollectionMenu                                       from './collectionMenu'
import Icon                                                 from '../icon'

class Header extends React.Component {
    static propTypes = {

    }

    state = {

    }

    render () {
        let user = this.props.user
        user = user.profile && user.profile._id && user.accessToken ? user : null
        return (
            <Headroom className={styles.headerWrap} pinStart={64} disableInlineStyles={true}>
                <nav className={ClassNames(styles.header, styles.primaryNav)}>
                    <div className={ClassNames(styles.primaryNavInner, 'clearfix')}>
                        <div className={styles.headLogoWrap}>
                            <a href="/"><img className={styles.logo} src={logo} /></a>
                        </div>
                        <div className={styles.headSearchContainer}>
                            <HeadSearchBox router={this.props.router} />
                        </div>
                        <ul className={styles.headMenuItems}>
                            {!user &&
                            <li className={styles.loginTextWrap}><a href={`${appConfig.accountCenter}/signin?${appConfig.authRedirectKey}=${encodeURIComponent(appConfig.home + this.props.location.pathname)}`}><span>登录</span></a></li>
                            }
                            <SubmitMenu />
                            {user &&
                            <UserMenu user={user} signOut={this.props.signOut} />
                            }
                            <MoreMenu />
                        </ul>
                    </div>
                </nav>
                <div className={ClassNames('secondary-navbar', styles.secondaryNav)}>
                    <div className={ClassNames(styles.secondaryNavInner, 'clearfix')}>
                        <ul className={ClassNames(styles.secondaryMenuItems, styles.secondaryLeft)}>
                            <li className={styles.secondaryMenuItem}><Link to="/" activeClassName={styles.active}><Icon type="home" />首页</Link></li>
                            <li className={styles.secondaryMenuItem}><Link to="/latest" activeClassName={styles.active}><Icon type="query_builder" />最新</Link></li>
                            <li className={styles.secondaryMenuItem}><Link to="/explore" activeClassName={styles.active}><Icon type="visibility" />发现</Link></li>
                            <li className={styles.secondaryMenuItem}><Link to="/share" activeClassName={styles.active}><Icon type="all_inclusive" />分享</Link></li>
                        </ul>
                        <ul className={ClassNames(styles.secondaryMenuItems, styles.secondaryRight)}>
                            <CategoryMenu />
                            <CollectionMenu />
                        </ul>
                    </div>
                </div>
            </Headroom>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => {
            dispatch(Actions.signOut())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
