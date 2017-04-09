import React, { PropTypes }                                 from 'react'
import ClassNames                                           from 'classnames'
import * as styles                                          from './style.scss'
import Popover                                              from 'material-ui/Popover'
import Menu                                                 from 'material-ui/Menu'
import MenuItem                                             from 'material-ui/MenuItem'
import Icon                                                 from '../icon'
import defaultAvatar                                        from '../../assets/images/avatar.png'
import appConfig                                            from '../../../config'
import createBrowserHistory                                 from 'history/lib/createBrowserHistory'

export default class HeadSearchBox extends React.Component {
    static propTypes = {
        focus: PropTypes.bool,
        search: PropTypes.string
    }

    state = {
        focus: false,
        search: ''
    }

    handleTouchTap = (event) => {
        event.preventDefault()

        this.setState({
            focus: true
        })
    }

    handleRequestClose = () => {
        this.setState({
            open: false
        })
    }

    onChange = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    onFocus = (event) => {
        this.setState({
            focus: true
        })
    }

    onBlur = (event) => {
        this.setState({
            focus: false
        })
    }

    onKeyPress = (event) => {
        if (this.state.search && event.key === 'Enter') {
            const url = '/search?key=' + this.state.search
            this.props.router.push(url)
        }
    }

    render () {
        return (
            <div className={styles.headSearchWrap}>
                <div className={ClassNames(styles.headSearch, {[styles.focus]: this.state.focus})}>
                    <Icon className={styles.searchIcon} type="search" style={{color: 'rgba(255, 255, 255, 0.25)', position: 'absolute'}} />
                    <input type="text" autoComplete="off" className={styles.searchInput} placeholder="Search more..." spellCheck="false" value={this.state.search} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} onKeyPress={this.onKeyPress} />
                </div>
            </div>
        )
    }
}
