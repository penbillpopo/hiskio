import {apiLogin,apiLogout,apiGetMe,apiGetMeServer} from '../api/index'
export const state = ()=>({
    isLoginOpen:false,
    accessToken:'',
    authenticated:false,
    userData:null
})
export const mutations = {
    CHANGE_ISLOGINOPEN(state,isOpen){
        state.isLoginOpen = isOpen;
    },
    CHANGE_USERDATA(state,data){
        state.userData = Object.assign({},data);
    },
    CHANGE_AUTHENTICATED(state,authenticated){
        state.authenticated = authenticated
    },
}
export const actions = {
    async nuxtServerInit ({ commit }, context) {
        const cookie = context.ssrContext.req.headers.cookie
        //server
        if(cookie){
            const cookieparser = require('cookieparser');
            const tokenObj = JSON.parse(cookieparser.parse(cookie).accessToken);
            const token = tokenObj.token
            return apiGetMeServer(token).then((res)=>{
                commit('CHANGE_USERDATA',res.data)
                if(res){
                    commit('CHANGE_AUTHENTICATED',true)
                }else{
                    commit('CHANGE_AUTHENTICATED',false)
                }
            })
        }
        return
    },
    changeIsLoginOpen({commit},isOpen){
        commit('CHANGE_ISLOGINOPEN',isOpen)
    },
    async login({commit,dispatch},formData){
        const {data} = await apiLogin(formData)
        if(data){
            commit('CHANGE_ISLOGINOPEN',false)
            this.$cookies.set('accessToken', {token:data.access_token})
            await dispatch('getInfo',data.access_token)
        }
    },
    getInfo({commit},token){
        return new Promise(async resolve=>{
            if(token){
                try {
                    const {data} = await apiGetMe(token)
                    commit('CHANGE_USERDATA',data)
                    if(data){
                        commit('CHANGE_AUTHENTICATED',true)
                    }else{
                        commit('CHANGE_AUTHENTICATED',false)
                    }
                    resolve()
                } catch (error) {
                    commit('CHANGE_AUTHENTICATED',false)
                    resolve()
                }
            }else{
                commit('CHANGE_AUTHENTICATED',false)
                this.$cookies.remove("accessToken")
                resolve()
            }
        })
    },
    async logout({commit}){
        const {token} = this.$cookies.get("accessToken")
        if(token){
            const res = await apiLogout(token)
            if(res){
                commit('CHANGE_AUTHENTICATED',false)
                this.$cookies.remove("accessToken")
            }
        }
    }
}
export const getters = {
    getUserData:state=>{
        return state.userData
    },
    getIsLoginOpen:state=>{
        return state.isLoginOpen
    },
    getAuthenticated:state=>{
        return state.authenticated
    }
}