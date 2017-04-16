import React                    from 'react'
import Header                   from '../components/header'

export default class App extends React.Component {
    render () {
        return (
            <div style={{backgroundColor: '#ebeff1'}}>
                <Header location={this.props.location} router={this.props.router}/>
                <div id="wrapper">{this.props.children}</div>
            </div>
        )
    }
}
