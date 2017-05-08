import React, { PropTypes }                                 from 'react'
import ClassNames                                           from 'classnames'
import * as styles                                          from './style.scss'
import Popover                                              from 'material-ui/Popover'
import Menu                                                 from 'material-ui/Menu'
import MenuItem                                             from 'material-ui/MenuItem'
import defaultAvatar                                        from '../../assets/images/avatar.png'
import appConfig                                            from '../../../config'

export default class UserMenu extends React.Component {
    state = {
        open: false,
        anchorEl: null
    }

    handleTouchTap = (event) => {
        event.preventDefault()

        this.setState({
            open: true,
            anchorEl: event.currentTarget
        })
    }

    handleRequestClose = () => {
        this.setState({
            open: false
        })
    }

    handleMenuItemClick = (event, menuItem, index) => {
        if (index === 3) {
            this.props.signOut()
        } else {
            location.href = menuItem.props.value
        }
        this.handleRequestClose()
    }

    render () {
        return (
            <li className={ClassNames(styles.headMenuItem, styles.userProfile)}>
                <a href="javascript:;" onClick={this.handleTouchTap}><img src={this.props.user.avatar || defaultAvatar} /></a>
                <Popover open={this.state.open} anchorEl={this.state.anchorEl} anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'middle', vertical: 'top'}} onRequestClose={this.handleRequestClose}>
                    <Menu onItemTouchTap={this.handleMenuItemClick}>
                        <MenuItem primaryText="我的资料" value={`${appConfig.accountCenter}/profile`} />
                        <MenuItem primaryText="我的收藏" value="/collections/mine" />
                        <MenuItem primaryText="设置" value={`${appConfig.accountCenter}/settings`} />
                        <MenuItem primaryText="登出" />
                    </Menu>
                </Popover>
            </li>
        )
    }
}
