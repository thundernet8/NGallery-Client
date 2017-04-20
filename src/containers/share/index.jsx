import React                        from 'react'
import { connect }                  from 'react-redux'
import ClassNames                   from 'classnames'
import * as styles                  from './style.scss'
import ShareListMain                from '../../components/shareMain'
import ShareListSidebar             from '../../components/shareSidebar'

class ShareListPage extends React.Component {
    render () {
        return (
            <div className={ClassNames(styles.content)}>
                <div className={ClassNames(styles.row, 'row')}>
                    <ShareListMain/>
                    <ShareListSidebar/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareListPage)
