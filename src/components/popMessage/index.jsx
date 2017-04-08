import React, { PropTypes }         from 'react'
import TextField                    from 'material-ui/TextField'
import RaisedButton                 from 'material-ui/RaisedButton'
import Dialog                       from 'material-ui/Dialog'
import FlatButton                   from 'material-ui/FlatButton'
import { FormattedMessage, injectIntl, defineMessages }         from 'react-intl'
import IntlProvider                 from '../../i18n/provider'
import MuiThemeProvider             from 'material-ui/styles/MuiThemeProvider'
import Notification                 from 'rc-notification'

const intlMsgs = defineMessages({
    labelOk: {
        id: '_LabelOk',
        defaultMessage: 'OK'
    }
})

class _PopMessage extends React.Component {
    render () {
        const {formatMessage} = this.props.intl

        const actions = [
            <FlatButton
                label={formatMessage(intlMsgs.labelOk)}
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.close}
            />
        ]

        return (
            <Dialog title={this.props.title} actions={actions} modal={false} open={true} onRequestClose={this.props.close}>
            {this.props.text}
            </Dialog>
        )
    }
}

let PopMessage = injectIntl(_PopMessage)

let key
let prefixCls = 'gn-message'
let messageInstance

const getMessageInstance = () => {
  messageInstance = messageInstance || Notification.newInstance({
    prefixCls,
    transitionName: 'move-up',
    style: {},
    getContainer: null // 默认 body 下
  })
  return messageInstance
}

const notice = (title, text, duration) => {
    let instance = getMessageInstance()
    let close = () => {
        if (messageInstance) {
            messageInstance.destroy()
            messageInstance = null
        }
    }
    instance.notice({
        key,
        duration,
        style: {},
        content: (
            <div className={`${prefixCls}-content`}>
                <MuiThemeProvider><IntlProvider><PopMessage open={true} title={title} text={text} close={close}/></IntlProvider></MuiThemeProvider>
            </div>
        ),
        onClose: () => { /* console.log('close') */ }
    })

    return (() => {
        let target = key++
        return () => {
            instance.removeNotice(target)
        }
    })()
}

export default {
    show: (title, text, duration = 3) => {
        notice(title, text, duration)
    },
    destroy: () => {
        if (messageInstance) {
            messageInstance.destroy()
            messageInstance = null
        }
    }
}
