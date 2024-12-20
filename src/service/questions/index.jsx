import { api } from "../../api"

export const getAllQuestions = async (page = 1) => {
	const res = await api.get(`/questions/?page=${page}`);
	return res;
}

export const addQuestion = async (data) => {
	const res = await api.post('/questions/', data);
	return res;
}

export const getAllQuestionNoPagination = async () => {
	return await api.get('/questions/all');
}

export const getQuestionById = async (questionId) => {
	return await api.get(`/questions/${questionId}`);
}

export const updateQuestionService = async (data) => {
	return await api.put('/questions/', data);
}

export const deleteQuestionByIdService = async (id) => {
	return await api.delete(`/questions/${id}`);
}