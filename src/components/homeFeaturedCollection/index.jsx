import React                                from 'react'
import { Link }                             from 'react-router'
import { connect }                          from 'react-redux'
import ClassNames                           from 'classnames'
import * as styles                          from './style.scss'
import defaultAvatar                        from '../../assets/images/avatar.png'
import randColor                            from '../../utils/randColor'
import Actions                              from '../../actions'

class HomeFeaturedCollection extends React.Component {
    componentWillMount () {
        this.props.getFeaturedCollections()
    }

    render () {
        const items = this.props.featuredCollections.map((collection, index) => {
            return (
                <div key={index} className={ClassNames(styles.item, 'col-lg-4 col-md-4 col-sm-6 col-xs-12')}>
                    <div className={styles.card} style={{backgroundColor: randColor()}}>
                        <Link className={styles.imgLink} to={`/collection/${collection.id}`}><img srcSet="" src={collection.featuredImage.url} alt="" title="" /></Link>
                        <div className={styles.info}>
                            <Link className={styles.authorLink} to={`/user/${collection.author.id}`}>
                                <img className={styles.authorAvatar} src={collection.author.avatar} title={collection.author.nickname} />
                            </Link>
                            <div className={styles.metabox}>
                                <h2 className={styles.name}>{collection.name}</h2>
                                <div className={styles.counts}>
                                    <span>{`${collection.postsCount} 文章`}</span>
                                    {collection.followers &&
                                    <span className={styles.point}></span>}
                                    {collection.followers &&
                                    <span>{`${collection.followers} 关注`}</span>}
                                </div>
                            </div>
                            <span className={ClassNames(styles.followBtn, 'btn-primary')}>关注</span>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className={styles.HomeFeaturedCollection}>
                <div className={ClassNames(styles.sectionHeader, 'clearfix')}>
                    <div className={styles.heading}>
                        <h3>精选藏夹</h3>
                        <Link className={ClassNames(styles.moreBtn, 'btn-primary btn-shadow')} to="/collections">MORE</Link>
                    </div>
                </div>
                <div className={ClassNames(styles.row, 'row')}>
                    {items}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        featuredCollections: state.featuredCollections
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFeaturedCollections: () => {
            return dispatch(Actions.getFeaturedCollections())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeaturedCollection)
