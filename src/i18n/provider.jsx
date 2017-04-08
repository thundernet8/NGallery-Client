import React                from 'react'
import zhCN                 from './zh_CN'
import enUS                 from './en_US'
import {IntlProvider, addLocaleData}       from 'react-intl'
import en                   from 'react-intl/locale-data/en'
import zh                   from 'react-intl/locale-data/zh'

addLocaleData([...en, ...zh])

const chooseLocale = (language) => {
    switch (language.split('-')[0]) {
        case 'zh':
            return zhCN
        default:
            return enUS
    }
}

export default class LocalProvider extends React.Component {
    render () {
        return (
            <IntlProvider locale={this.props.language} messages={chooseLocale(this.props.language)}>{this.props.children}</IntlProvider>
        )
    }
}
