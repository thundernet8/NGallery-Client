import React, { PropTypes }                                 from 'react'
import ClassNames                                           from 'classnames'
import Headroom                                             from 'react-headroom'
import * as styles                                          from './style.scss'
import logo                                                 from '../../assets/images/logo.png'

export default class Header extends React.Component {
    render () {
        return (
            <Headroom className={styles.headerWrap} pinStart={20}>
                <nav className={ClassNames(styles.header, styles.primaryNav)}>
                    <div className={ClassNames(styles.primaryNavInner, 'clearfix')}>
                        <div className={styles.headLogoWrap}>
                            <a href="/"><img className={styles.logo} src={logo} /></a>
                        </div>
                        <div className={styles.headSearchWrap}>
                            search
                        </div>
                    </div>
                </nav>
            </Headroom>
        )
    }
}
