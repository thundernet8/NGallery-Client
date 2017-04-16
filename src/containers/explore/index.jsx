import { connect }                  from 'react-redux'
import React, { PropTypes }         from 'react'
import Meta                         from '../../components/meta'
import VistorBanner                 from '../../components/vistorBanner'
import ExplorePosts                 from '../../components/explorePosts'
import styles                       from '../latest/style.scss'

class ExplorePage extends React.Component {
    componentDidMount () {

    }

    componentWillUnmount () {

    }

    componentWillReceiveProps (nextProps) {

    }

    render () {
        const meta = {
            title: 'Explore Galleries',
            description: 'Explore galleries excite your eyes'
        }
        return (
            <div>
                <Meta meta={meta} />
                {(!this.props.user || !this.props.user.accessToken) &&
                <VistorBanner location={this.props.location} />}
                <div className={styles.content}>
                    <ExplorePosts />
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

export default connect(mapStateToProps, mapDispatchToProps)(ExplorePage)
