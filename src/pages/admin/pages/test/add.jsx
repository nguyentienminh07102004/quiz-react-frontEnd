import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Select
} from "antd";
import React from "react";
import ReactQuill from "react-quill";
import { Notification } from "../../../../components/Notification";
import { getAllQuestionNoPagination } from "../../../../service/questions";
import { saveTest } from "../../../../service/tests";
import { Difficulty } from "../../difficulty";
import { AddQuestionTest } from "./AddQuestionTest";
import { QuestionItem } from "./QuestionItem";
import { useSelector } from "react-redux";

export function AddTest() {
	const [listQuestion, setListQuestion] = React.useState([]);
	const [contextHolder, openNotification] = Notification();
	const [isReload, setIsReload] = React.useState(false);
	const questionList = useSelector(state => state.QuestionReducer);
	const loadData = async () => {
		const res = await getAllQuestionNoPagination();
		if (res.status === 200) {
			setListQuestion(res.data.response);
		}
	};
	React.useEffect(() => {
		loadData();
	}, [isReload]);
	const addTestAPI = async (value) => {
		value.questionIds = questionList;
		const res = await saveTest(value);
		if (res.status === 201) {
			openNotification({
				message: "Thành công",
				description: "Thêm thành công",
				type: "success",
			});
		} else {
			openNotification({
				message: "Thất bại",
				description: "Thêm thất bại",
				type: "warning"
			})
		}
	};
	return (
		<>
			{contextHolder}
			<Form name="addTest" onFinish={addTestAPI}>
				<Row gutter={[12, 12]} className="position-relative">
					<Col lg={10} xs={24}>
						<Form.Item name="title" label="Tiêu đề">
							<Input />
						</Form.Item>
						<Form.Item name="description" label="Mô tả">
							<ReactQuill formats={["image"]} />
						</Form.Item>
						<Form.Item name="difficulty" label="Độ khó">
							<Select options={Difficulty} />
						</Form.Item>
						<Button htmlType="submit" variant="primary">
							Thêm bài thi
						</Button>
					</Col>
					<Col
						lg={14}
						xs={24}
						style={{ overflowY: "auto" }}
						className="h-screen position-sticky"
					>
						<AddQuestionTest setIsReload={setIsReload} isReload={isReload} />
						<Form.Item name="questionIds">
							{listQuestion.map((question) => (
								<QuestionItem
									question={question}
									key={question.id}
								/>
							))}
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</>
	);
}
