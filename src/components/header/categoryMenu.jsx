import React, { PropTypes }                                 from 'react'
import ClassNames                                           from 'classnames'
import * as styles                                          from './style.scss'
import appConfig                                            from '../../../config'
import { Link }                                             from 'react-router'

export default class CategoryMenu extends React.Component {
    render () {
        return (
            <li className={ClassNames(styles.secondaryMenuItem, styles.dropdown)}>
                <a href="javascript:;">分类</a>
                <div className={ClassNames(styles.catColsWrap, styles.dropdownWrap)}>
                    <div className={ClassNames('columns row', styles.catCols)}>
                        <div className={ClassNames('col-md-4 column', styles.catCol)}>
                            <h3><span>搬运</span></h3>
                            <ul>
                                <li><Link to="/posts/tag/douban">豆瓣</Link></li>
                                <li><Link to="/posts/tag/jiandan">煎蛋</Link></li>
                                <li><Link to="/posts/tag/zhihu">知乎</Link></li>
                                <li><Link to="/posts/tag/toutiao">头条</Link>{/* 网红 */}</li>
                                <li><Link to="/posts/tag/xiaoyuan">校园</Link></li>
                                <li><Link to="/posts/tag/mingxin">明星</Link></li>
                                <li><Link to="/posts/tag/mote">模特</Link></li>
                                <li><Link to="/posts/tag/zhubo">主播</Link></li>
                            </ul>
                        </div>
                        <div className={ClassNames('col-md-4 column', styles.catCol)}>
                            <h3><span>系列</span></h3>
                            <ul>
                                <li><Link to="/posts/tag/bijini">比基尼</Link></li>
                                <li><Link to="/posts/tag/niuzai">牛仔</Link></li>
                                <li><Link to="/posts/tag/siwa">丝袜</Link></li>
                                <li><Link to="/posts/tag/xiezhen">写真</Link></li>
                                <li><Link to="/posts/tag/sheyin">摄影</Link></li>
                                <li><Link to="/posts/tag/zipai">自拍</Link></li>
                                <li><Link to="/posts/tag/huwai">户外</Link>{/* 街拍 */}</li>
                                <li><Link to="/posts/tag/yinshi">影视</Link></li>
                            </ul>
                        </div>
                        <div className={ClassNames('col-md-4 column', styles.catCol)}>
                            <h3><span>看点</span></h3>
                            <ul>
                                <li><Link to="/posts/tag/xingan">性感</Link></li>
                                <li><Link to="/posts/tag/qingqu">情趣</Link></li>
                                <li><Link to="/posts/tag/qingchun">清纯</Link></li>
                                <li><Link to="/posts/tag/luoli">萝莉</Link></li>
                                <li><Link to="/posts/tag/meiyan">美颜</Link></li>
                                <li><Link to="/posts/tag/liangfa">靓发</Link></li>
                                <li><Link to="/posts/tag/suxiong">酥胸</Link></li>
                                <li><Link to="/posts/tag/meitui">美腿</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.allTagsLink}><Link to="/posts">查看全部<i className="fa fa-angle-right" /></Link></div>
                </div>
            </li>
        )
    }
}
