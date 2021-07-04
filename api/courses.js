import request from "./share/requestServer";


export const fundraising = (token)=> request.get('/courses/fundraising',{
    headers: {'Authorization': `Bearer ${token}`}
})



