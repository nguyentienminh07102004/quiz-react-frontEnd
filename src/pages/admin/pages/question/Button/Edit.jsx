import { Button, Form, Input, Modal, Select, Switch } from "antd";
import React from "react";
import {
	getQuestionById,
	updateQuestionService,
} from "../../../../../service/questions";
import { getAllCategoryNoPagination } from "../../../../../service/category";
import { TextEditor } from "../../../../../components/TextEditor";
import { AnswerItem } from "../AnswerItem";
import { TiPlusOutline } from "react-icons/ti";
import { FaPenToSquare } from "react-icons/fa6";
import { Notification } from "../../../../../components/Notification";

export const EditQuestion = ({ id }) => {
	const [question, setQuestion] = React.useState({});
	const [category, setCategory] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const [contextHolder, openNotification] = Notification();
	const [loading, setLoading] = React.useState(false);
	React.useEffect(() => {
		const loadData = async () => {
			const res = await getQuestionById(id);
			const resCategory = await getAllCategoryNoPagination();
			setCategory(resCategory.data.response);
			setQuestion(res.data.response);
		};
		loadData();
	}, []);
	const options = category.map((item) => ({
		label: item.name,
		value: item.code,
	}));
	const updateQuestion = async (value) => {
		try {
			setLoading(true);
			value.id = question.id;
			value.category = value.category.code;
			await updateQuestionService(value);
			openNotification({
				message: "Cập nhập thành công",
				type: "success",
			});
			setOpen(false);
		} catch (err) {
			openNotification({
				message: err.data.response.message,
				type: "success",
			});
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			{contextHolder}
			<Button
				className="bg-yellow-400 mx-4"
				onClick={() => setOpen(true)}
				icon={<FaPenToSquare />}
			>
				Sửa
			</Button>
			<Modal
				open={open}
				onCancel={() => setOpen(false)}
				title={`Câu hỏi có mã: ${question.id}`}
				footer={false}
			>
				<Form
					initialValues={question}
					layout="vertical"
					onFinish={updateQuestion}
				>
					<Form.Item name="title" label="Tiêu đề">
						<Input />
					</Form.Item>
					<Form.Item name={["category", "code"]} label="Thể loại">
						<Select options={options} />
					</Form.Item>
					<Form.Item name="content" label="Nội dung câu hỏi">
						<TextEditor format={{ header: 3, bold: true }} />
					</Form.Item>
					<Form.Item name="shortDescription" label="Mô tả ngắn">
						<TextEditor format={{ header: 4, bold: true }} />
					</Form.Item>
					<Form.List name="answers">
						{(fields, { add, remove }) => {
							return (
								<>
									{fields.map(
										({ key, name, ...restField }) => {
											return (
												<AnswerItem
													index={key}
													key={key}
													remove={remove}
													resetFields={restField}
													name={name}
												/>
											);
										}
									)}
									<div>
										<Button
											type="dashed"
											icon={<TiPlusOutline />}
											onClick={() => add()}
										>
											Thêm câu trả lời
										</Button>
									</div>
								</>
							);
						}}
					</Form.List>
					<div className="flex justify-center">
						<Button
							htmlType="submit"
							className="bg-blue-300"
							loading={loading}
						>
							Sửa câu hỏi
						</Button>
					</div>
				</Form>
			</Modal>
		</>
	);
};
