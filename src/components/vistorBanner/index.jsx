import React, { PropTypes }                                     from 'react'
import ClassNames                                               from 'classnames'
import * as styles                                              from './style.scss'
import appConfig                                                from '../../../config'
import banner                                                   from '../../assets/images/gallery.jpg'
import bannerGray                                                   from '../../assets/images/gallery-gray.jpg'

export default class VistorBanner extends React.Component {
    render () {
        return (
            <div className={styles.indexBanner} style={{backgroundImage: `url(${Math.random() > 0.5 ? banner : bannerGray})`}}>
                <div className={styles.inner}>
                    <div className={styles.content}>
                        <h1>放松、愉悦、飨以身心</h1>
                        <p>独乐乐不如众乐乐，加入并分享你的美图珍藏</p>
                        <a href={`${appConfig.accountCenter}/signin?${appConfig.authRedirectKey}=${encodeURIComponent(appConfig.home + this.props.location.pathname)}`}>现在加入</a>
                    </div>
                </div>
            </div>
        )
    }
}
