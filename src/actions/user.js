import CONSTANTS                from '../constants'
import axios                    from 'axios'

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
