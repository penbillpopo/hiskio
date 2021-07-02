import request from "./share/request";

export const login = (formData)=> request.post('/auth/login',formData)
export const logout = (token)=> request.post('/auth/logout',null,{
    headers: {'Authorization': `Bearer ${token}`}
})