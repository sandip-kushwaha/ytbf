import api from "./axios";

export const  createCategory = async (formData) => {
    const respose = await api.post("/categories/create-category", formData);

    return respose.data;
}

export const getAllCategories = async () => {
    const respose = await api.get("/categories");

    return respose.data;
}

export const getCategoryById = async (id) => {
    const respose = await api.get(`/categories/${id}`);

    return respose.data;
}

export const updateCategory = async (id, formData) =>{
    const respose = await api.patch(`/categories/${id}`, formData)

    return respose.data;
}

export const updateCategoryStatus = async (id, isActive) => {
    const respose = await api.patch(`/categories/${id}/status`, { isActive });

    return respose.data;
}

export const deleteCategory = async (id) => {
    const respose = await api.delete(`/categories/${id}`);

    return respose.data;
}