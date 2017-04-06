import React                        from 'react'
import DocumentMeta                 from 'react-document-meta'
import config                       from '../../../config'

export default class Meta extends React.Component {
    render () {
        let meta = {
            title: 'Account Center' + ' - ' + config.app,
            description: config.description
        }

        if (this.props.meta) {
            meta = this.props.meta
            meta.title += ' - ' + config.app
        }

        return (
            <DocumentMeta {...meta} />
        )
    }
}
