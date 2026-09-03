import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers:{
        "Content-Type": "application/json",
    },
});


// RESPONSE INTERCEPTOR

let isRefreshing = false;
let failedQueue = [];

// Release waiting requests
const processQueue = (error = null) => {
    failedQueue.forEach((promise) => {
        if(error){
            promise.reject(error);
        }else{
            promise.resolve();
        }
    });

    failedQueue = [];
}

api.interceptors.response.use(
    //success
    (response) => {
        return response;
    },

    //error
    async (error) => {
        const originalRequest = error.config;

        if(
        error.response?.status === 401 &&
        !originalRequest?._retry &&
        !originalRequest?.url?.includes("/auth/refresh-token")
    ){
      originalRequest._retry = true;
      
      //Refresh already running
      if(isRefreshing){
        return new Promise((resolve, reject) => {
            failedQueue.push({
                resolve,
                reject,
            });
        }).then(() => {
          // Refresh completed
          // Retry original request
          return api(originalRequest);
        });
      }

      //Start refresh
      isRefreshing = true;

      try{
        await api.post("/auth/refresh-token");
         
        // Refresh successful
        processQueue();

        return api(originalRequest);

      } catch (refreshError){
         // Refresh failed
        processQueue(refreshError);

        return Promise.reject(refreshError);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
    
  }

);

export default api;