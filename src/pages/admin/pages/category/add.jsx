import { Button, Form, Input } from "antd";
import React from "react";
import { Notification } from "../../../../components/Notification";
import { TextEditor } from "../../../../components/TextEditor";
import { addCategory } from "../../../../service/category";

export const AddCategory = () => {
	const [contextHolder, openNotification] = Notification();
	const [form] = Form.useForm();
	const AddCategory = async (value) => {
		const res = await addCategory(value);
		if (res.status === 201) {
			openNotification({
				message: "Thành công",
				description: "Thêm thành công",
				type: "success",
			});
			form.resetFields();
		} else {
			openNotification({
				message: "Thất bại",
				type: "error",
			});
		}
	};
	return (
		<>
			{contextHolder}
			<div>
				<Form name="addCategory" onFinish={AddCategory} form={form}>
					<Form.Item
						label="Tên thể loại"
						name="name"
						rules={[
							{
								required: true,
								message: "Tên thể loại là bắt buộc",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Mô tả thể loại"
						name="description"
						rules={[
							{
								required: false,
							},
						]}
					>
						<TextEditor />
					</Form.Item>
					<Form.Item className="d-flex justify-content-center">
						<Button type="primary" htmlType="submit">
							Thêm thể loại
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
};
