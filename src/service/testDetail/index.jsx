import { api } from "../../api"

export const saveTestDetail = async (data) => {
	const res = await api.post(`/test-detail/`, data);
	return res;
}

export const getTestDetailById = async (id) => {
	const res = await api.get(`/test-detail/${id}`);
	return res;
}

export const getTopUserHighScore = async (testId, maxTop = 3) => {
	return await api.get(`/test-detail/max-top/${maxTop}/${testId}`);
}

export const getTestDetailByTestId = async (testId) => {
	return await api.get(`/test-detail/tests/${testId}`);
}