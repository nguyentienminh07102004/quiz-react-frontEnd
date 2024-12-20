import { Alert, Card } from "antd";
import { AnswerClient } from "../Answer";

export const QuestionContent = (props) => {
	const { item, index } = props;
	return (
		<Card title={`Câu hỏi ${index + 1}`} className="mt-4">
			<Alert className="text-center" type="info" message={<div dangerouslySetInnerHTML={{ __html: item.content }} />} />
			{item.answers.map((answer) => {
				return (
					<AnswerClient
						item={answer}
						questionId={item.id}
						key={answer.id}
					/>
				);
			})}
		</Card>
	);
};
