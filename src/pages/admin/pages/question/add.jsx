import { Button, Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { TiPlusOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { Notification } from "../../../../components/Notification";
import { TextEditor } from "../../../../components/TextEditor";
import { getAllCategoryNoPagination } from "../../../../service/category";
import { addQuestion } from "../../../../service/questions";
import { AnswerItem } from "./AnswerItem";

export const AddQuestion = () => {
	const [categoryList, setCategoryList] = React.useState([]);
	const [contextHolder, openNotification] = Notification();
	const [form] = useForm();
	React.useEffect(() => {
		const loadData = async () => {
			const res = await getAllCategoryNoPagination();
			const categoryList = res.data.response;
			const content = categoryList.map((item) => {
				return {
					label: item.name,
					value: item.code,
				};
			});
			setCategoryList(content);
		};
		loadData();
	}, []);
	const nav = useNavigate();
	const addQuestionSubmit = async (value) => {
		try {
			await addQuestion(value);
			openNotification({
				message: "Thành công!",
				description: "Thêm câu hỏi thành công",
				type: "success",
			});
			form.resetFields();
		} catch (err) {
			if (err.status === 401) {
				nav("/login", { state: "unauthenticated" });
			} else if (err.status === 403) {
				nav("/unauthorized");
			}
		}
	};
	return (
		<div className="overflow-y-auto max-h-screen">
			{contextHolder}
			<Form
				onFinish={addQuestionSubmit}
				layout="vertical"
				form={form}
				autoComplete={true}
			>
				<Form.Item name="title" label="Tiêu đề">
					<Input />
				</Form.Item>
				<Form.Item name="category" label="Thể loại">
					<Select showSearch options={categoryList} />
				</Form.Item>
				<Form.Item name="shortDescription" label="Mô tả">
					<TextEditor />
				</Form.Item>
				<Form.Item name="content" label="Nội dung">
					<TextEditor format={{ header: 3, bold: true }} />
				</Form.Item>
				<Form.List name="answers">
					{(fields, { add, remove }) => {
						return (
							<>
								{fields.map(({ key, name, ...restField }) => {
									return (
										<AnswerItem
											index={key}
											key={key}
											remove={remove}
											resetFields={restField}
											name={name}
										/>
									);
								})}
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
				<div className="d-flex justify-content-center">
					<Button type="primary" color="info" htmlType="submit">
						Thêm câu hỏi
					</Button>
				</div>
			</Form>
		</div>
	);
};
