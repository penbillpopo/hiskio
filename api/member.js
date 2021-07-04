import request from "./share/request";
import requestServer from "./share/requestServer";

export const getMe = (token)=> request.get('/me',{
    headers: {'Authorization': `Bearer ${token}`}
})
export const getMeServer = (token)=> requestServer.get('/me',{
    headers: {'Authorization': `Bearer ${token}`}
})
