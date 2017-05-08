import React                        from 'react'
import { connect }                  from 'react-redux'
import { Link }                     from 'react-router'
import ClassNames                   from 'classnames'
import * as styles                  from '../../containers/share/style.scss'
import Actions                      from '../../actions'
import randColor                    from '../../utils/randColor'
import InfiniteScroll               from 'react-infinite-scroller'
import LineLoader                   from '../lineLoader'
import * as dateFormatter           from 'date-format'
import banner                       from '../../assets/images/banner-350x300.jpg'
import dataImage                    from '../../utils/dataImage'

class ShareListSidebar extends React.Component {
    componentWillMount () {
        this.props.getRandShares(8)
        this.props.getRandGalleries(5)
    }

    render () {
        const randShares = this.props.randShares.map((share, index) => {
            return (
                <li key={index}><Link to={share.url}>{share.title}</Link></li>
            )
        })
        const randGalleries = this.props.randGalleries.map((gallery, index) => {
            return (
                <li key={index}>
                    <Link to={gallery.url}>
                        <img src={dataImage(gallery.featuredImage.width, gallery.featuredImage.height)} className={styles.placeholder} />
                        <img src={gallery.featuredImage.url} className={styles.preview} />
                        <h2>{gallery.title}</h2>
                    </Link>
                </li>
            )
        })
        return (
            <div className={ClassNames(styles.sidebar, 'col-md-4 col-sm-6')}>
                <div className={ClassNames(styles.widget, styles.randShareWidget)}>
                    <div className={styles.widgetTitle}><h2>随机推荐</h2></div>
                    <div className={styles.widgetBody}>
                        <ul>{randShares}</ul>
                    </div>
                </div>
                <div className={ClassNames(styles.widget, styles.bannerWidget)}>
                    <div className={styles.widgetBody}>
                        <a href="https://baidu.com"><img src={banner} /></a>
                    </div>
                </div>
                <div className={ClassNames(styles.widget, styles.randGalleryWidget)}>
                    <div className={styles.widgetTitle}><h2>猜你喜欢</h2></div>
                    <div className={styles.widgetBody}>
                        <ul>{randGalleries}</ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        randShares: state.randShares,
        randGalleries: state.randGalleries
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRandShares: (count) => {
            return dispatch(Actions.getRandShares(count))
        },
        getRandGalleries: (count) => {
            return dispatch(Actions.getRandGalleries(count))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareListSidebar)
