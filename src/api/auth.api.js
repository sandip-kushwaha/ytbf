import api from "./axios"

export const loginAdmin = async(data) => {
    const respose = await api.post("/auth/login", data);

    return respose.data;
};

export const getCurrentUser = async() => {
    const respose = await api.get("/auth/current-user");

    return respose.data;
};

export const logoutAdmin = async() => {
     const respose = await api.post("/auth/logout");

     return respose.data;
};

export const refreshAccessToken = async() => {
    const respose = await api.post("/auth/refresh-token");

    return respose.data;
};