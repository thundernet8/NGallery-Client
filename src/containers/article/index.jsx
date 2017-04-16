import React                        from 'react'
import { connect }                  from 'react-redux'
import { Link }                     from 'react-router'
import ClassNames                   from 'classnames'
import * as styles                  from './style.scss'
import randColor                    from '../../utils/randColor'
import Icon                         from '../../components/icon'
import InfiniteScroll               from 'react-infinite-scroller'
import LineLoader                   from '../../components/lineLoader'
import Actions                      from '../../actions'
import thumbPlaceholder             from '../../assets/images/thumb-placeholder.png'
import * as dateFormatter           from 'date-format'
import Spinner                      from '../../components/spinner'

class ArticlePage extends React.Component {
    componentWillMount () {
        this.props.getArticle(this.props.params.slug)
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.params.slug !== this.props.params.slug) {
            this.props.getArticle(nextProps.params.slug)
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        if (nextProps.params.slug !== this.props.params.slug || !this.props.article || nextProps.article.id !== this.props.article.id) {
            return true
        }
        return false
    }

    render () {
        if (!this.props.article) {
            return (
                <div className={styles.spinnerWrap}><Spinner size={60} thickness={2} /></div>
            )
        }

        return (
            <div className={ClassNames(styles.article, styles.content)}>
                <div className={ClassNames(styles.inner)}>
                    <div className={styles.heading}>
                        <h1>{this.props.article.title}</h1>
                        <div className={styles.time}>
                            {`发布于 ${dateFormatter.asString('yyyy-MM-dd hh:mm', new Date(this.props.article.createdAt))}`}
                            {this.props.article.updatedAt && ` · 更新于 ${dateFormatter.asString('yyyy-MM-dd hh:mm', new Date(this.props.article.updatedAt))}`}
                        </div>
                    </div>
                    <div className={styles.body}>{this.props.article.content}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        article: state.article
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticle: (slug) => {
            return dispatch(Actions.getArticle(slug))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage)
