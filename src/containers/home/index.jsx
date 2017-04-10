import { connect }                  from 'react-redux'
import React, { PropTypes }         from 'react'
import Meta                         from '../../components/meta'
import VistorBanner                 from '../../components/vistorBanner'
import HomeFeatured                 from '../../components/homeFeatured'
import HomeFeaturedCollection       from '../../components/homeFeaturedCollection'
import HomeHotTags                  from '../../components/homeHotTags'
import styles                       from './style.scss'

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
                {(!this.props.user || !this.props.user.accessToken) &&
                <VistorBanner location={this.props.location} />}
                <div className={styles.content}>
                    <HomeFeatured />
                    <HomeFeaturedCollection />
                    <HomeHotTags />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
