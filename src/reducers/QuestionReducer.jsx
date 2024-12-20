export const QuestionReducer = (state = [], action) => {
	if (action.type === "addQuestion") {
		return [...state, action.id];
	} else if (action.type === "removeQuestion") {
		return state.filter((item) => item != action.id);
	} else if(action.type === "removeAll") {
		return [];
	}
	return state;
};
