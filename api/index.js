import {login,logout} from './auth'
import {me,meServer} from './member'
import {fundraisingServer} from './courses'

export const apiLogin = login
export const apiLogout = logout
export const apiGetMe = me
export const apiGetMeServer = meServer
export const apiGetFundServer = fundraisingServer