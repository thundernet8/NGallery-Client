import React, { PropTypes }                                 from 'react'
import ClassNames                                           from 'classnames'
import * as styles                                          from './style.scss'
import Popover                                              from 'material-ui/Popover'
import Menu                                                 from 'material-ui/Menu'
import MenuItem                                             from 'material-ui/MenuItem'

export default class SubmitMenu extends React.Component {
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

    render () {
        return (
            <li className={ClassNames(styles.headMenuItem, styles.submitBtn)}>
                <i className="fa fa-plus-circle" onClick={this.handleTouchTap} />
                <Popover open={this.state.open} anchorEl={this.state.anchorEl} anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'middle', vertical: 'top'}} onRequestClose={this.handleRequestClose}>
                    <Menu>
                        <MenuItem primaryText="分享图片" />
                        <MenuItem primaryText="上传图集" />
                    </Menu>
                </Popover>
            </li>
        )
    }
}
