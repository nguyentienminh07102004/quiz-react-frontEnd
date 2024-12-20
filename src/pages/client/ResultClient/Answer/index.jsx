import { Alert, Checkbox } from "antd";
import React from "react";

export const AnswerResult = (props) => {
	const { item, answerSelected, answerCorrect } = props;
	let answerColor = "info";
	if(!answerCorrect.includes(item.id) && answerSelected.includes(item.id)) {
		answerColor = "error";
	} else if(answerCorrect.includes(item.id) || answerCorrect.includes(item.id) && answerSelected.includes(item.id)) {
		answerColor = "success";
	}
	return (
		<>
			<Alert
				type={answerColor}
				message={<div dangerouslySetInnerHTML={{ __html: item.content }} />}
				className="mt-1 mb-1 text-center"
				style={{ cursor: "pointer" }}
				icon={<Checkbox checked={answerSelected.includes(item.id)} />}
				showIcon
			/>
		</>
	);
};
