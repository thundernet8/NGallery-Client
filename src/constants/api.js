import config           from '../../config'

export const API_BASE = config.api
export const LOGIN_API = API_BASE + '/users/token'
export const REGISTER_API = API_BASE + '/users'
