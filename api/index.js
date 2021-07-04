import {login,logout} from './auth'
import {me,meServer} from './member'
import {fundraising} from './courses'

export const apiLogin = login
export const apiLogout = logout
export const apiGetMe = me
export const apiGetMeServer = meServer
export const apiGetFund = fundraising