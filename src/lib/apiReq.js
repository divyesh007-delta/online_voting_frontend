import axios from "axios";

const apiReq = axios.create({
    baseURL: 'https://localhost:7141/api',
})

export default apiReq;