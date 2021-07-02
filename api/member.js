import request from "./share/request";
import requestServer from "./share/requestServer";

export const me = (token)=> request.get('/me',{
    headers: {'Authorization': `Bearer ${token}`}
})
export const meServer = (token)=> requestServer.get('/me',{
    headers: {'Authorization': `Bearer ${token}`}
})
