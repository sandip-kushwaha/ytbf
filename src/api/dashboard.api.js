import api from "./axios";

export const getDashboardStats = async () => {
    const respose = await api.get("/dashboard/stats");

    return respose.data;
}

export const getRecentNews = async () => {
    const respose = await api.get("/dashboard/recent-news");

    return respose.data;
}

export const getMostViewedNews = async () => {
    const respose = await api.get("/dashboard/most-viewed");

    return respose.data;
}