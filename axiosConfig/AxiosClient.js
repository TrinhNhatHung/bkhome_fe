import axios from "axios";
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: "http://192.168.1.6:8081/bkhome",
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    
    paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.response.use((response) => {

    return response;
}, (error) => {
    // Handle errors
    throw error;
});

export default axiosClient;