import { Button, Modal } from "antd";
import React from "react";
import { AddQuestion } from "../question/add.jsx";

export const AddQuestionTest = () => {
	const [isAddQuestion, setIsAddQuestion] = React.useState(false);
	const addQuestion = () => {
		setIsAddQuestion(true);
	};
	return (
		<>
			<Button
				className="bg-success mb-4 position-sticky top-0 left-0 z-50"
				onClick={addQuestion}
			>
				Thêm câu hỏi
			</Button>
			<Modal
				open={isAddQuestion}
				width={"80rem"}
				onCancel={() => setIsAddQuestion(false)}
				onOk={() => setIsAddQuestion(false)}
				onBlur={() => setIsAddQuestion(false)}
			>
				<AddQuestion />
			</Modal>
		</>
	);
};
