import { Button, DatePicker, Form, Input, Select } from "antd";
import React from "react";
import { register } from "../../../../service/register";
import { Notification } from "../../../../components/Notification";

export const AddUser = () => {
	const roles = [
		{ value: "ADMIN", label: "Quản trị viên" },
		{ value: "USER", label: "Người dùng" },
	];
	const rule = {
		required: true,
		message: "Đây là dữ liệu là bắt buộc",
	};
	const [form] = Form.useForm();
	const dateOfBirth = React.useRef(null);
	const [loading, setLoading] = React.useState(false);
	const [contextHolder, openNotification] = Notification();
	const addUser = async (value) => {
		setLoading(true);
		if (dateOfBirth.current !== null) {
			const [day, month, year] = dateOfBirth.current.split("/");
			value.dateOfBirth = `${year}-${month}-${day}`;
		}
		try {
			await register(value);
			openNotification({
				type: "success",
				message: "Đăng ký thành công",
			});
			form.resetFields();
		} catch (err) {
			openNotification({
				type: "warning",
				message: err.response.data.message,
			});
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="mx-24">
			{contextHolder}
			<Form
				layout="vertical"
				onFinish={addUser}
				form={form}
				className="max-[600px]"
			>
				<Form.Item name="firstname" label="Họ">
					<Input />
				</Form.Item>
				<Form.Item name="lastname" label="Tên">
					<Input />
				</Form.Item>
				<Form.Item
					name="email"
					rules={[
						{
							type: "email",
							message: "Vui lòng điền đúng định dạng email!",
						},
						rule,
					]}
					label="Email"
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ min: 8 }, rule]}
					label="Mật khẩu"
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					name="rePassword"
					rules={[{ min: 8 }, rule]}
					label="Nhập lại mật khẩu"
				>
					<Input.Password />
				</Form.Item>
				<Form.Item name="address" label="Địa chỉ">
					<Input />
				</Form.Item>
				<Form.Item name="dateOfBirth" label="Ngày tháng năm sinh">
					<DatePicker
						className="w-full"
						format={{
							format: "DD/MM/YYYY",
						}}
						allowClear
						onChange={(_, dateString) =>
							(dateOfBirth.current = dateString)
						}
					/>
				</Form.Item>
				<Form.Item name="roles" label="Quyền">
					<Select options={roles} mode={"multiple"} allowClear />
				</Form.Item>
				<div className="flex justify-center">
					<Button
						htmlType="submit"
						className="bg-blue-300"
						loading={loading}
					>
						Thêm người dùng
					</Button>
				</div>
			</Form>
		</div>
	);
};
