import React                    from 'react'
import Header                   from '../components/header'

export default class App extends React.Component {
    render () {
        return (
            <div>
                <Header location={this.props.location} router={this.props.router}/>
                {this.props.children}
            </div>
        )
    }
}
