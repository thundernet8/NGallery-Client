import React, { PropTypes }                                 from 'react'
import ClassNames                                           from 'classnames'
import * as styles                                          from './style.scss'
import Icon                                                 from '../icon'
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
                                <li><Link to="/posts/t/douban">豆瓣</Link></li>
                                <li><Link to="/posts/t/jiandan">煎蛋</Link></li>
                                <li><Link to="/posts/t/zhihu">知乎</Link></li>
                                <li><Link to="/posts/t/toutiao">头条</Link>{/* 网红 */}</li>
                                <li><Link to="/posts/t/xiaoyuan">校园</Link></li>
                                <li><Link to="/posts/t/mingxin">明星</Link></li>
                                <li><Link to="/posts/t/mote">模特</Link></li>
                                <li><Link to="/posts/t/zhubo">主播</Link></li>
                            </ul>
                        </div>
                        <div className={ClassNames('col-md-4 column', styles.catCol)}>
                            <h3><span>系列</span></h3>
                            <ul>
                                <li><Link to="/posts/t/bijini">比基尼</Link></li>
                                <li><Link to="/posts/t/niuzai">牛仔</Link></li>
                                <li><Link to="/posts/t/siwa">丝袜</Link></li>
                                <li><Link to="/posts/t/xiezhen">写真</Link></li>
                                <li><Link to="/posts/t/sheyin">摄影</Link></li>
                                <li><Link to="/posts/t/zipai">自拍</Link></li>
                                <li><Link to="/posts/t/huwai">户外</Link>{/* 街拍 */}</li>
                                <li><Link to="/posts/t/yinshi">影视</Link></li>
                            </ul>
                        </div>
                        <div className={ClassNames('col-md-4 column', styles.catCol)}>
                            <h3><span>看点</span></h3>
                            <ul>
                                <li><Link to="/posts/t/xingan">性感</Link></li>
                                <li><Link to="/posts/t/qingqu">情趣</Link></li>
                                <li><Link to="/posts/t/qingchun">清纯</Link></li>
                                <li><Link to="/posts/t/luoli">萝莉</Link></li>
                                <li><Link to="/posts/t/meiyan">美颜</Link></li>
                                <li><Link to="/posts/t/liangfa">靓发</Link></li>
                                <li><Link to="/posts/t/suxiong">酥胸</Link></li>
                                <li><Link to="/posts/t/meitui">美腿</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.allTagsLink}><Link to="/posts">查看全部<Icon type="chevron_right" /></Link></div>
                </div>
            </li>
        )
    }
}
