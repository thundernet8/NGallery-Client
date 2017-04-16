import React, { PropTypes }                                 from 'react'
import ClassNames                                           from 'classnames'
import * as styles                                          from './style.scss'
import { Link }                                             from 'react-router'

export default class CollectionMenu extends React.Component {
    render () {
        return (
            <li className={ClassNames(styles.secondaryMenuItem, styles.dropdown)}>
                <a href="javascript:;">图夹</a>
                <div className={ClassNames(styles.collectionMenuItemsWrap, styles.dropdownWrap)}>
                    <ul>
                        <li><Link to="/collections/mine">我的图夹</Link></li>
                        <li><Link to="/collections/following">关注图夹</Link></li>
                    </ul>
                    <h3><Link to="/collections">全部图夹</Link></h3>
                </div>
            </li>
        )
    }
}
