import React, { PropTypes }                                 from 'react'
import ClassNames                                           from 'classnames'
import * as styles                                          from './style.scss'
import Popover                                              from 'material-ui/Popover'
import Menu                                                 from 'material-ui/Menu'
import MenuItem                                             from 'material-ui/MenuItem'
import Icon                                                 from '../icon'
import defaultAvatar                                        from '../../assets/images/avatar.png'
import appConfig                                            from '../../../config'
import { Link }                                             from 'react-router'

export default class MoreMenu extends React.Component {
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
        // location.href = menuItem.props.value
        this.handleRequestClose()
    }

    render () {
        return (
            <li className={ClassNames(styles.headMenuItem, styles.moreMeun)}>
                <Icon type="more_vert" onClick={this.handleTouchTap} />
                <Popover open={this.state.open} anchorEl={this.state.anchorEl} anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'middle', vertical: 'top'}} onRequestClose={this.handleRequestClose}>
                    <Menu onItemTouchTap={this.handleMenuItemClick}>
                        <MenuItem className={styles.moreMeunItem}><Link to="/article/faq">FAQ</Link></MenuItem>
                        <MenuItem className={styles.moreMeunItem}><Link to="/article/terms">条款</Link></MenuItem>
                        <MenuItem className={styles.moreMeunItem}><Link to="/article/about">关于</Link></MenuItem>
                    </Menu>
                </Popover>
            </li>
        )
    }
}
