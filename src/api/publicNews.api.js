// import api from "./axios";

// // Get published news
// export const getPublishedNews = async (params = {}) => {
//   const response = await api.get("/news/published", {
//     params,
//   });

//   return response.data;
// };

// // Get featured news
// export const getFeaturedNews = async (params = {}) => {
//   const response = await api.get("/news/featured", {
//     params,
//   });

//   return response.data;
// };

// // Get single news
// export const getPublicNewsById = async (id) => {
//   const response = await api.get(`/news/${id}`);

//   return response.data;
// };

// // Increment views
// export const incrementNewsViews = async (id) => {
//   const response = await api.get(`/news/${id}/views`);

//   return response.data;
// };

// // Get categories
// export const getPublicCategories = async () => {
//   const response = await api.get("/categories");

//   return response.data;
// };