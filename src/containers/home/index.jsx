import { connect }                  from 'react-redux'
import React, { PropTypes }         from 'react'
import Meta                         from '../../components/meta'

class Home extends React.Component {
    componentDidMount () {

    }

    componentWillUnmount () {

    }

    componentWillReceiveProps (nextProps) {

    }

    render () {
        const meta = {
            title: 'Home',
            description: 'Galleries excite your eyes'
        }
        return (
        <div style={{height: 2000}}>
            <Meta meta={meta} />
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
