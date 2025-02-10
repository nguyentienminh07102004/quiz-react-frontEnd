import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Notification } from "../../../components/Notification";
import { getTestDetailById } from "../../../service/testDetail";
import { QuestionResult } from "./Question";
import { ResultMessage } from "./ResultMessage";

export const Result = () => {
	const { id } = useParams();
	console.log(id);
	const [contextHolder, openNotification] = Notification();
	const data = useLocation();
	const nav = useNavigate();
	const [answerSelected, setAnswerSelected] = React.useState([]);
	const [questionList, setQuestionList] = React.useState([]);
	const [testDetail, setTestDetail] = React.useState({});
	const RestartTest = async () => {
		nav(`/tests/detail/${testDetail.test.id}`);
	};
	const BackToHome = () => {
		nav("/");
	};
	React.useEffect(() => {
		const loadData = async () => {
			const res = await getTestDetailById(id);
			setAnswerSelected(res.data.response.answers);
			setQuestionList(res.data.response.test.questionResponses);
			setTestDetail(res.data.response);
		};
		loadData();
		if (data.state) {
			openNotification({
				type: data.state,
				message: "Chúc mừng bạn đã hoàn thành bài thi",
			});
		}
	}, [id]);
	return (
		<>
			{contextHolder}
			<ResultMessage item={testDetail} />
			{questionList.map((item, index) => {
				const indexQuestion = answerSelected.findIndex(
					(question) => question.questionId === item.id
				);
				const answers =
					indexQuestion >= 0 ? answerSelected[indexQuestion] : [];
				const answerCorrect = item.answers
					.filter((answer) => answer.isCorrect)
					.map((answer) => answer.id);
				return (
					<QuestionResult
						item={item}
						answerSelected={answers}
						answerCorrect={answerCorrect}
						key={index}
						index={index}
					/>
				);
			})}
			<div className="flex justify-evenly mt-4">
				<div
					className="ps-5 pe-5 pt-2 pb-2 rounded fs-6 bg-primary cursor-pointer"
					onClick={RestartTest}
				>
					Làm lại
				</div>
				<div
					className="ps-5 pe-5 pt-2 pb-2 rounded fs-6 bg-primary cursor-pointer"
					onClick={BackToHome}
				>
					Trang chủ
				</div>
			</div>
		</>
	);
};
