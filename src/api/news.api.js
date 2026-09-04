import api from "./axios";

export const createNews = async (formData) => {
    const response = await api.post("/news/create-news", formData);

    return response.data;
};

export const getAllNews = async (params = {}) => {
    const response = await api.get("/news", { params ,});

    return response.data;
}

export const getFeaturedNews = async (params = {}) => {
    const response = await api.get("/news/featured", { params, });

    return response.data;
}

export const getNewsById = async (id) =>{
    const response = await api.get(`/news/${id}`);

    return response.data;
}

export const updateNews = async(id, formData) => {
    const response = await api.patch(`/news/${id}`, formData);

    return response.data;
}

export const deleteNews = async (id) => {
    const response = await api.delete(`/news/${id}`);

    return response.data;
};

export const toggleFeaturedNews = async (id) => {
    const response = await api.patch(`/news/${id}/featured`);

    return response.data;
}

export const incrementNewsViews = async (id) =>{
    const response = await api.get(`/news/${id}/views`);

   return response.data;
}