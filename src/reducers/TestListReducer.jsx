export const TestListReducer = (state = {}, action) => {
	if(action.type === "SUCCESS") {
		return action.object;
	}
	return state;
}