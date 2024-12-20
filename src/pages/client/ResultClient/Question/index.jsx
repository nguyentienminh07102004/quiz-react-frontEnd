import { Alert, Card } from "antd";
import { AnswerResult } from "../Answer";

export const QuestionResult = (props) => {
	const { item, answerSelected, index, answerCorrect } = props;
	return (
		<Card title={`Câu hỏi ${index + 1}`} className="mt-3">
			<Alert
				className="text-center"
				message={<div dangerouslySetInnerHTML={{ __html: item.content }} />}
			/>
			{item.answers.map((answer) => {
				return (
					<AnswerResult
						item={answer}
						key={answer.id}
						answerSelected={answerSelected.answerIds}
						answerCorrect={answerCorrect}
					/>
				);
			})}
		</Card>
	);
};
