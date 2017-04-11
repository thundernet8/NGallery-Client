import { connect }                  from 'react-redux'
import React, { PropTypes }         from 'react'
import Meta                         from '../../components/meta'
import VistorBanner                 from '../../components/vistorBanner'
import LatestPosts                  from '../../components/latestPosts'
import styles                       from './style.scss'

class LatestPage extends React.Component {
    componentDidMount () {

    }

    componentWillUnmount () {

    }

    componentWillReceiveProps (nextProps) {

    }

    render () {
        const meta = {
            title: 'Latest Gallery',
            description: 'Latest galleries excite your eyes'
        }
        return (
            <div>
                <Meta meta={meta} />
                {(!this.props.user || !this.props.user.accessToken) &&
                <VistorBanner location={this.props.location} />}
                <div className={styles.content}>
                    <LatestPosts />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LatestPage)
