import request from "./share/request";

export const postCarts = (data,token)=> request.post('/carts',data,{
    headers: {'Authorization': `Bearer ${token}`}
})
export const deleteCarts = (data,token)=> request.delete('/carts',{
    headers: {'Authorization': `Bearer ${token}`},
    data: data
})
