import React, { PropTypes }                                 from 'react'
import ClassNames                                           from 'classnames'
import * as styles                                          from './style.scss'
import Popover                                              from 'material-ui/Popover'
import Menu                                                 from 'material-ui/Menu'
import MenuItem                                             from 'material-ui/MenuItem'
import Icon                                                 from '../icon'

export default class SubmitMenu extends React.Component {
    static propTypes = {
        open: PropTypes.bool,
        anchorEl: PropTypes.any
    }

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
            <li className={styles.submitBtn}>
                <Icon type="add_circle_outline" onClick={this.handleTouchTap} style={{color: 'rgba(255, 255, 255, 0.75)'}} />
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
