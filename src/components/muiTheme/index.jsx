import React                                                    from 'react'
import MuiThemeProvider                                         from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme                                              from 'material-ui/styles/getMuiTheme'
import { blue500 }                                              from 'material-ui/styles/colors'

export default class ThemeProvider extends React.Component {
    render () {
        let themeOptions = {
            palette: {
                primary1Color: blue500
            }
        }

        if (this.props.userAgent) {
            themeOptions.userAgent = this.props.userAgent
        }

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(themeOptions)}>{this.props.children}</MuiThemeProvider>
        )
    }
}
