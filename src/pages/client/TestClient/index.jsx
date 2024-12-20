import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { removeAll } from "../../../actions/TestDetailActions";
import { saveTestDetail } from "../../../service/testDetail";
import { QuestionContent } from "./Question";

export const TestClient = () => {
	const data = useLocation();
	const answerSelected = useSelector(state => state.TestDetailReducer);
	const dispatch = useDispatch();
	const nav = useNavigate();
	const submitTest = async () => {
		const requestData = new Object();
		for(const key in data.state) {
			if(key !== "test") requestData[key] = data.state[key];
		}
		requestData["answers"] = answerSelected;
		requestData["modifiedDate"] = new Date();
		await saveTestDetail(requestData);
		dispatch(removeAll());
		nav(`/result/${data.state.id}`, { state: "success" });
	}
	const cancelTest = () => {
		dispatch(removeAll());
		nav(`/test-detail/${data.state.testId}`);
	}
	return (
		<>
			<div>
				{data.state ? (
					<>
						{data.state.test.questionResponses.map(
							(item, index) => {
								return (
									<QuestionContent
										item={item}
										index={index}
										key={index}
									/>
								);
							}
						)}
						<div className="d-flex justify-content-evenly mt-3">
							<button className="btn btn-primary" onClick={submitTest}>Nộp bài</button>
							<button className="btn btn-primary" onClick={cancelTest}>Huỷ</button>
						</div>
					</>
				) : (
					<Navigate to={"/"} />
				)}
			</div>
		</>
	);
};
