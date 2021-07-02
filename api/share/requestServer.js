import axios from 'axios'
const url = 'http://localhost:3000/v2/'
export default axios.create({
    baseURL:url
})
