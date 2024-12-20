export const TestDetailReducer = (state = [], action) => {
	if (action.type === "ADD_ANSWER") {
		const index = state.findIndex(
			(item) => item.questionId === action.questionId
		);
		if (index === -1) {
			return [
				...state,
				{
					questionId: action.questionId,
					answerIds: [action.answerId],
				},
			];
		} else {
			return state.map((item) => {
				if (item.questionId === action.questionId) {
					return {
						questionId: item.questionId,
						answerIds: [...item.answerIds, action.answerId],
					};
				} else {
					return item;
				}
			});
		}
	} else if (action.type === "REMOVE_ANSWER") {
		return state.map((item) => {
			if (item.questionId === action.questionId) {
				return {
					questionId: action.questionId,
					answerIds: item.answerIds.filter(
						(answer) => answer !== action.answerId
					),
				};
			}
			else return item;
		});
	} else if (action.type === "REMOVE_ALL") {
		return [];
	}
	return state;
};
