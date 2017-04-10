import React                            from 'react'
import { Link }                         from 'react-router'
import { connect }                      from 'react-redux'
import ClassNames                       from 'classnames'
import * as styles                      from './style.scss'
import Actions                          from '../../actions'
import Masonry                          from 'react-masonry-infinite'
import randColor                        from '../../utils/randColor'
import Icon                             from '../icon'

const sizes = [{ columns: 1, gutter: 20 },
  { mq: '768px', columns: 2, gutter: 20 },
  { mq: '1024px', columns: 3, gutter: 20 }
]

class HomePopularPosts extends React.Component {
    state = {
        page: 1,
        images: 0
    }

    referMasonry = (component) => {
        this.masonry = component
    }

    handleImageLoad = (img) => {
        this.setState({
            images: ++this.state.images
        })
        this.masonry && this.masonry.state.instance.pack() // TODO 优化
    }

    handleLoadMore = () => {
        if (this.state.images !== this.props.homePopularPosts.length) {
            return
        }
        console.log(this.state.page)
        this.props.getPopularPosts(this.state.page)
    }

    componentWillMount () {
        // this.props.getPopularPosts()
    }

    componentWillReceiveProps (nextProps) {
        console.log('componentWillReceiveProps')
        if (nextProps.homePopularPosts.length > this.props.homePopularPosts.length) {
            this.setState({
                page: ++this.state.page
            })
        }
    }

    render () {
        const items = this.props.homePopularPosts.map((post, index) => {
            return (
                <div key={index} className={ClassNames(styles.masonryBox, 'animated scaleFadeIn')} style={{width: '33.333%', background: randColor()}}>
                    <div className={styles.boxInner} style={{background: randColor()}}>
                        {/* <span className={styles.saveBtn}>+ SAVE</span> */}
                        <Link className={styles.imgLink} to={`/p/${post._id}`}><img onLoad={this.handleImageLoad} srcSet="" src={post.featuredImage.url} alt="" title={post.title} /></Link>
                        {/* <div className={styles.metabox}>
                            <Link className={styles.authorLink} to={`/u/${post.author._id}`}><img className={styles.authorAvatar} src={post.author.avatar} /><span>{post.author.name}</span></Link>
                            <div className={styles.counts}>
                                <em><Icon type="favorite_border" />{post.likes}</em>
                                <em><Icon type="visibility" />{post.views}</em>
                                <em><Icon type="turned_in_not" />8</em> favorites count
                                <em><Icon type="chat_bubble_outline" />{post.comments}</em>
                            </div>
                        </div> */}
                    </div>
                </div>
            )
        })

        const loader = <div>Loading...</div>

        return (
            <div className={styles.homePosts}>
                <Masonry className={ClassNames(styles.row, styles.masonryWrap)} ref={this.referMasonry} sizes={sizes} style={{margin: '0 auto'}} pack={true} hasMore={true} loadMore={this.handleLoadMore} loader={loader}>
                    {items}
                </Masonry>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        homePopularPosts: state.homePopularPosts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPopularPosts: (page) => {
            return dispatch(Actions.getHomePopularPosts(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePopularPosts)
