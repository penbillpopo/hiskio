import requestServer from "./share/requestServer";


export const fundraisingServer = (token)=> requestServer.get('/courses/fundraising',{
    headers: {'Authorization': `Bearer ${token}`}
})



