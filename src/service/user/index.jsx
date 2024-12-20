import { api } from "../../api"

export const getUserById = async (id) => {
	const res = await api.get(`/users/${id}`);
	return res;
}

export const logout = async () => {
	localStorage.clear();
	const res = await api.post(`/users/logout`);
	return res;
}

export const getAllUsers = async (params) => {
	return await api.get('/users/', {
		params: params
	});
}

export const changePassword = async (data) => {
	return await api.post('/users/change-password', data);
}

export const getMyInfo = async () => {
	return await api.get('/users/my-info');
}

export const loginWithGoogle = async (code) => {
	return await api.post('/users/login-google', {
		"code": code
	});
}

export const loginWithGithub = async (code) => {
	return await api.post("/users/login-github", {
		"code": code
	});
}

export const deleteUser = async (id) => {
	return await api.delete(`/users/${id}`);
}

export const updateUser = async (data) => {
	return await api.put('/users/', data);
}