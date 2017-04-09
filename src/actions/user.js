import CONSTANTS                from '../constants'
import axios                    from 'axios'
import reactCookie              from 'react-cookie'
import appConfig                from '../../config'

export const setAccessToken = (token) => {
    return {
        type: CONSTANTS.SET_ACCESS_TOKEN,
        token
    }
}

export const deleteAccessToken = () => {
    return {
        type: CONSTANTS.DELETE_ACCESS_TOKEN
    }
}

export const setUser = (profile) => {
    return {
        type: CONSTANTS.SET_USER,
        profile
    }
}

export const signOut = () => {
    return dispatch => {
        reactCookie.save(appConfig.tokenCookie, '', {expires: new Date(0)})
        dispatch({
            type: CONSTANTS.SIGN_OUT
        })
    }
}
