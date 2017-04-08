export function getUrlQuery (key, search) {
    if (!search) {
        return ''
    }
    const reg = new RegExp(`[&|?]${key}=([^&]*)`, 'i')
    const result = reg.exec(search)

    return result ? result[1] : ''
}

export function addUrlQuery (url, kv) {
    const hasQuery = /\?/.test(url)
    return Object.keys(kv).reduce(function (str, key, i) {
        let delimiter, val
        delimiter = (i === 0 && !hasQuery) ? '?' : '&'
        key = encodeURIComponent(key)
        val = encodeURIComponent(kv[key])
        return [str, delimiter, key, '=', val].join('')
    }, url)
}

export function removeUrlQuery (url, key) {
    const reg = new RegExp(`[&|?]${key}=([^&]*)`, 'i')
    const result = reg.exec(url)
    if (result) {
        url = url.split('')
        const find = result[0]
        const index = result['index']
        if (url[index] === '?') {
            url.splice(index + 1, find.length)
        } else {
            url.splice(index, find.length)
        }

        if (url[url.length - 1] === '?') {
            url.splice(url.length - 1)
        }
        return url.join('')
    }
}
