export const addQuestionAction = (id) => {
	return {
		type: "addQuestion",
		id: id
	};
}

export const removeQuestionAction = (id) => {
	return {
		type: "removeQuestion",
		id: id
	}
}