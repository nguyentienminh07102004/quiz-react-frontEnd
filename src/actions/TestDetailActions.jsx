export const addAnswer = (questionId, answerId) => {
	return {
		type: "ADD_ANSWER",
		questionId: questionId,
		answerId: answerId
	};
}

export const removeAnswer = (questionId, answerId) => {
	return {
		type: "REMOVE_ANSWER",
		questionId: questionId,
		answerId: answerId
	};
}

export const removeAll = () => {
	return {
		type: "REMOVE_ALL"
	};
}