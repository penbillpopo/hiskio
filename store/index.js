import {apiLogin,apiLogout,apiGetMe,apiGetMeServer,apiPostCarts,apiDeleteCarts} from '../api/index'

export const state = ()=>({
    isLoginOpen:false,
    accessToken:'',
    authenticated:false,
    userData:null,
    carts:[]
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
    CHANGE_CARTS(state,arr){
        state.carts = [...arr]
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
        await apiLogin(formData).then(async (response)=>{
            commit('CHANGE_ISLOGINOPEN',false)
            this.$cookies.set('accessToken', {token:response.data.access_token})
            await dispatch('updateCarts')
            await dispatch('getInfo',response.data.access_token)
            this.$toast.success("登入成功", { 
                position: "top-center", 
                duration : 1500
            });
            console.log(response)

        }).catch(error=>{
            const message = error.response.data.message
            this.$toast.error(`登入失敗，${message[Object.keys(message)[0]].toString()}`, { 
                position: "top-center", 
                duration : 1500
            });
        })
    },
    getInfo({commit},token){
        return new Promise(async resolve=>{
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
                this.$cookies.remove("accessToken")
                resolve()
            }
        })
    },
    async logout({commit}){
        const accessToken = this.$cookies.get("accessToken")
        if(accessToken){
            await apiLogout(accessToken.token).then(()=>{
                commit('CHANGE_AUTHENTICATED',false)
                this.$cookies.remove("accessToken")
            }).catch(function (error) {
                const message = error.response.data.message
                this.$toast.error(`登出失敗,${message[Object.keys(message)[0]].toString()}`, { 
                    position: "top-center", 
                    duration : 1500
                });
            })
        }
    },
    async updateCarts({commit}){
        let cookie = this.$cookies.get('accessToken')
        await apiPostCarts({items: [], coupon: ""},cookie.token).then((res)=>{
            commit('CHANGE_CARTS',res.data.data)
        }).catch(function (error) {
            const message = error.response.data.message
            this.$toast.error(`更新購物車失敗,${message[Object.keys(message)[0]].toString()}`, { 
                position: "top-center", 
                duration : 1500
            });
        })
    },
    async addCarts({dispatch},id){
        let cookie = this.$cookies.get('accessToken')
        let item = {
          "id": id,
          "coupon": ""
        }
        await apiPostCarts({items: [item], coupon: ""},cookie.token).then(()=>{
            dispatch('updateCarts')
            this.$toast.success('已加入購物車', { 
                position: "top-center", 
                duration : 1500
            });
        }).catch(function (error) {
            const message = error.response.data.message
            this.$toast.error(`加入購物車失敗,${message[Object.keys(message)[0]].toString()}`, { 
                position: "top-center", 
                duration : 1500
            });
        })
    },
    async deleteCarts({dispatch},id){
        let cookie = this.$cookies.get('accessToken')
        let item = {
          "id": id,
          "coupon": ""
        }
        await apiDeleteCarts({items: [item], coupon: ""},cookie.token).then((res)=>{
            dispatch('updateCarts')
            this.$toast.success("刪除成功", { 
                position: "top-center", 
                duration : 1500
            });
        }).catch(function (error) {
            const message = error.response.data.message
            this.$toast.error(`刪除失敗,${message[Object.keys(message)[0]].toString()}`, { 
                position: "top-center", 
                duration : 1500
            });
        })
    },
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
    },
    getCarts:state=>{
        return state.carts
    }
}