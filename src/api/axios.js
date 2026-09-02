import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers:{
        "Content-Type": "application/json",
    },
});

let isRefreshing = false;
let failedQueue = [];

//Process the waiting requests
const processQueue = (error) => {
    failedQueue.forEach((promise) => {
        if(error){
            promise.reject(error);
        }else{
            promise.resolve();
        }
    });

    failedQueue = [];
}





export default api;