import React                        from 'react'
import ClassNames                   from 'classnames'
import * as styles                  from './style.scss'

export default class Spinner extends React.Component {
    render () {
        const size = this.props.size || 60
        const thickness = this.props.thickness || 6
        return (
            <div className={ClassNames('gn-spinner', styles.spinWrap, this.props.className)} style={this.props.style}>
                <svg className={styles.spinner} width={`${size}px`} height={`${size}px`} viewBox={`0 0 ${size + 1} ${size + 1}`} xmlns="http://www.w3.org/2000/svg">
                    <circle className={styles.path} fill="none" strokeWidth={thickness} strokeLinecap="round" strokeDasharray={`${3.14159265 * (size - thickness)}`} cx={`${size / 2}`} cy={`${size / 2}`} r={`${(size - thickness) / 2}`}></circle>
                </svg>
            </div>
        )
    }
}
