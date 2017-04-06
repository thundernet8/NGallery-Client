import path                          from 'path'
import express                       from 'express'
import { match }                     from 'react-router'
import axios                         from 'axios'
import DocumentMeta                  from 'react-document-meta'
import Promise                       from 'bluebird'
import config                        from '../config'

const router = express.Router()

const authorize = (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject(new Error('no token'))
        }

        const axiosInstance = axios.create({
            baseURL: config.api,
            timeout: 1000,
            headers: {'Authorization': `Bearer ${token}`}
        })

        axiosInstance.get('/me')
        .then(ret => ret.data)
        .then((user) => {
            if (user && user._id) {
                resolve(user)
            } else {
                reject(new Error('invalid user profile'))
            }
        })
        .catch((err) => {
            reject(new Error(err))
        })
    })
}

router.route('*').get((req, res) => {
    let token = req.cookies && req.cookies[config.tokenCookie] || ''
    let profile = null
    authorize(token)
    .then((user) => {
        profile = user
    })
    .catch((err) => {
        res.clearCookie(config.tokenCookie)
        token = ''
    })
    .finally(() => {
        const meta = DocumentMeta.renderAsHTML()
        const reduxState = JSON.stringify({ user: {profile, accessToken: token} })
        res.render(path.resolve(__dirname, '../dist/index.ejs'), { meta, reduxState });
    })
})

export default router
