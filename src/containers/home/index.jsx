import { connect }                  from 'react-redux'
import React, { PropTypes }         from 'react'

class Home extends React.Component {
    componentDidMount () {

    }

    componentWillUnmount () {

    }

    componentWillReceiveProps (nextProps) {

    }

    render () {
        return (
        <div>
            {this.props.children}
        </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
