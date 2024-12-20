import { Button, Card, Form, Input, Modal, Tag } from "antd";
import React from "react";
import { TextEditor } from "../../../../../components/TextEditor";
import { updateCategory } from "../../../../../service/category";
import { Notification } from "../../../../../components/Notification";
import { FaPenToSquare } from "react-icons/fa6";

export const ButtonEdit = (props) => {
	const { item, className, reload } = props;
	const [form] = Form.useForm();
	const [isOpen, setIsOpen] = React.useState(false);
	const [contextHolder, openNotification] = Notification();
	const cancelEdit = () => {
		setIsOpen(false);
	};
	const okEdit = async () => {
		const data = form.getFieldsValue();
		data.code = item.code;
		try {
			await updateCategory(data);
			openNotification({
				type: "success",
				message: "Update thành công",
			});
			setIsOpen(false);
			reload();
		} catch (err) {
			openNotification({
				type: "warning",
				message: "Thất bại",
				description:
					"Có thể do thể loại này đang có liên kết với các câu hỏi khác! Vui lòng kiểm tra!",
			});
		}
	};
	return (
		<>
			{contextHolder}
			<Button
				className={className}
				onClick={() => setIsOpen(!isOpen)}
				icon={<FaPenToSquare />}
			>
				Sửa
			</Button>
			<Modal
				open={isOpen}
				onCancel={cancelEdit}
				onOk={okEdit}
				centered
				width={768}
				className="p-6 h-1/2"
			>
				<Card
					title={
						<>
							<span className="text-red-200 me-5">
								Mã thể loại
							</span>
							<Tag.CheckableTag checked>
								<span
									dangerouslySetInnerHTML={{
										__html: item.code,
									}}
								/>
							</Tag.CheckableTag>
						</>
					}
				>
					<Form
						labelCol={{ xs: 2 }}
						wrapperCol={{ xs: 22 }}
						form={form}
					>
						<Form.Item
							name="name"
							label="Tên"
							initialValue={item.name}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="description"
							label="Mô tả"
							initialValue={item.description}
						>
							<TextEditor />
						</Form.Item>
					</Form>
				</Card>
			</Modal>
		</>
	);
};
