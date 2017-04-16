import React                    from 'react'
import * as styles              from './style.scss'

export default class LineLoader extends React.Component {
    render () {
        const bgColor = this.props.bgColor || '#ff88af'
        return (
            <div className={styles.lineLoader}>
                <div className={styles.loaderBar} style={{backgroundColor: bgColor}}/>
                <div className={styles.loaderBar}/>
                <div className={styles.loaderBar}/>
            </div>
        )
    }
}
