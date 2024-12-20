import { api } from "../../api"

export const getAllCategory = async (page = 1) => {
	const res = await api.get(`/categories/?page=${page}`);
	return res.data;
}

export const getAllCategoryNoPagination = async () => {
	return await api.get("/categories/all");
}

export const addCategory = async (data) => {
	const response = await api.post(`/categories/`, data);
	return response;
}

export const updateCategory = async (data) => {
	const response = await api.put('/categories/', data);
	return response;
}

export const deleteCategory = async (id) => {
	const response = await api.delete(`/categories/${id}`);
	return response;
}