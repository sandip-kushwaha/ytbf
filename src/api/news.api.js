import api from "./axios";

//Create News
export const createNews = async (formData) => {
  const response = await api.post("/news/create-news", formData);

  return response.data;
};

//Get all News
export const getAllNews = async (params = {}) => {
  const response = await api.get("/news", { params });

  return response.data;
};

//Get News By Id
export const getNewsById = async (id) => {
  const response = await api.get(`/news/${id}`);

  return response.data;
};

//Update News
export const updateNews = async (id, formData) => {
  const response = await api.patch(`/news/${id}`, formData);

  return response.data;
};

//Delete News
export const deleteNews = async (id) => {
  const response = await api.delete(`/news/${id}`);

  return response.data;
};

// Toggle feature news
export const toggleFeaturedNews = async (id) => {
  const response = await api.patch(`/news/${id}/featured`);

  return response.data;
};

//Increse News Views
export const incrementNewsViews = async (id) => {
  const response = await api.get(`/news/${id}/views`);

  return response.data;
};

//Get featured news
export const getFeaturedNews = async ({page = 1, limit = 6} = {}) => {
  const response = await api.get("/news/featured", { params: { page, limit, } });

  return response.data;
};

//Get Published news
export const getPublishedNews = async ({
  page = 1,
  limit = 10,
  search = "",
  category = "",
} = {}) => {
  const response = await api.get("/news/published", {
    params: {
      page,
      limit,
      search,
      category,
    },
  });

  return response.data;
};

// Get Trending News
export const getTrendingNews = async ({
  page = 1,
  limit = 10,
  search = "",
  category = "",
} = {}) => {
  const response = await api.get("/news/trending", {
    params: {
      page,
      limit,
      search,
      category,
    },
  });

  return response.data;
};
