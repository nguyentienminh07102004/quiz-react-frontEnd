import { combineReducers } from "redux";
import { TestDetailReducer } from "./TestDetailReducer";
import { TestListReducer } from "./TestListReducer";
import { QuestionReducer } from "./QuestionReducer";

export const allReducer = combineReducers({
	TestDetailReducer,
	TestListReducer,
	QuestionReducer
});