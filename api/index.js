import {login,logout} from './auth'
import {getMe,getMeServer} from './member'
import {getFundraising} from './courses'
import {postCarts,deleteCarts} from './carts'

export const apiLogin = login
export const apiLogout = logout
export const apiGetMe = getMe
export const apiGetMeServer = getMeServer
export const apiGetFund = getFundraising
export const apiPostCarts = postCarts
export const apiDeleteCarts = deleteCarts