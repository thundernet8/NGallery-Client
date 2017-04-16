import React                        from 'react'
import FontIcon                     from 'material-ui/FontIcon'
import ClassNames                   from 'classnames'

export default class Icon extends React.Component {
    render () {
        return (
            <FontIcon className={ClassNames('material-icons', this.props.className)} onClick={this.props.onClick} style={this.props.style}>{this.props.type}</FontIcon>
        )
    }
}
