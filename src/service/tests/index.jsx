import { api } from "../../api";

export const getAllTest = async (page = 1) => {
	return await api.get(`/tests/all?page=${page}`);
};

export const getTestById = async (id) => {
	return await api.get(`/tests/${id}`);
};

export const saveTest = async (data) => {
	return await api.post("/tests/", data);
};

export const getTestByCondition = async (data = {}) => {
	const res = await api.get("/tests/condition", {
		params: data,
	});
	return res;
};

export const ratingTest = async (testId, rating) => {
	return await api.put("/tests/rate", {
		testId: testId,
		rating: rating,
	});
};

export const getTestRelated = async (testId, categories) => {
	return await api.get(`/tests/related/${testId}`, {
		params: {
			categories: categories,
		},
	});
};

export const getTestRatingByUser = async (testId) => {
	return await api.get(`/tests/rate/${testId}`);
};

export const deleteTest = async (testIds) => {
	return await api.delete(`/tests/${testIds}`);
};
