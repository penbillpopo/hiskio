import request from "./share/requestServer";


export const getFundraising = (token)=> request.get('/courses/fundraising',{
    headers: {'Authorization': `Bearer ${token}`}
})



