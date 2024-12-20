import { Alert, Checkbox } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { addAnswer, removeAnswer } from "../../../../actions/TestDetailActions";

export const AnswerClient = (props) => {
	const { item, questionId } = props;
	const dispatch = useDispatch();
	const [checked, setChecked] = React.useState(false);
	const handleChecked = () => {
		if(!checked) {
			dispatch(addAnswer(questionId, item.id));
		} else {
			dispatch(removeAnswer(questionId, item.id));
		}
		setChecked(!checked);
	}
	return (
		<>
			<Alert
				type="info"
				message={<div dangerouslySetInnerHTML={{ __html: item.content }} />}
				className="mt-1 mb-1 text-center"
				style={{ cursor: "pointer" }}
				icon={<Checkbox checked={checked} />}
				showIcon
				onClick={handleChecked}
			/>
		</>
	);
};
