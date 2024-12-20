import { Card, Checkbox, Rate } from "antd";
import React from "react";
import {
	addQuestionAction,
	removeQuestionAction,
} from "../../../../actions/QuestionAction";
import { useDispatch } from "react-redux";

export const QuestionItem = (props) => {
	const { question } = props;
	const [checked, setChecked] = React.useState(false);
	const dispatch = useDispatch();
	const handleQuestion = () => {
		setChecked(!checked);
		if (!checked) {
			dispatch(addQuestionAction(question.id));
		} else {
			dispatch(removeQuestionAction(question.id));
		}
	};
	return (
		<Card
			key={question.id}
			title={question.title}
			className="mb-3"
			bordered={true}
			extra={
				<Checkbox
					name="question"
					defaultValue={question.id}
					checked={checked}
				/>
			}
			hoverable={true}
			onClick={handleQuestion}
		>
			<Card.Meta
				description={
					<div className="flex justify-between">
						<strong
							className="text-xl flex items-center"
							dangerouslySetInnerHTML={{
								__html: question.content,
							}}
						/>
						<div className="flex flex-col items-end justify-between">
							<div>
								{question.answers?.length || 0} câu trả lời
							</div>
							<Rate disabled value={question.rate} />
							<div>{question.numsOfRatings} đánh giá</div>
						</div>
					</div>
				}
			/>
		</Card>
	);
};
