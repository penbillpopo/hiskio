import axios from 'axios'
const url = '/v2'
export default axios.create({
    baseURL:url
})
