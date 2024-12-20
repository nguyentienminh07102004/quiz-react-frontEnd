import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import React from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { Notification } from "../../../../components/Notification";
import { updateUser } from "../../../../service/user";

export const EditUser = ({ user, reload }) => {
	const [open, setOpen] = React.useState(false);
	const [form] = Form.useForm();
	const [contextHolder, openNotification] = Notification();
	const dateOfBirth = React.useRef(null);
	const [loading, setLoading] = React.useState(false);
	const roles = [
		{ value: "ADMIN", label: "Quản trị viên" },
		{ value: "USER", label: "Người dùng" },
	];
	if (user.dateOfBirth != null && typeof user.dateOfBirth === "string") {
		const [day, month, year] = user.dateOfBirth.split("/");
		user.dateOfBirth = dayjs(`${year}-${month}-${day}`);
		dateOfBirth.current = `${year}-${month}-${day}`;
	}
	const updateUserSubmit = async (value) => {
		setLoading(true);
		if (typeof dateOfBirth.current === 'string' && dateOfBirth.current.includes("/")) {
			const [day, month, year] = dateOfBirth.current.split("/");
			user.dateOfBirth = `${year}-${month}-${day}`;
		} else {
			user.dateOfBirth = dateOfBirth.current;
		}
		value.id = user.id;
		value.status = "ACTIVE";
		value.avatar = user.avatar;
		try {
			await updateUser(value);
			openNotification({
				type: "success",
				message: "Cập nhật thành công",
			});
			setOpen(false);
			reload();
		} catch (err) {
			openNotification({
				type: "warning",
				message: "Cập nhật thất bại",
			});
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			<Button
				className="bg-yellow-300 mx-2"
				icon={<FaPenToSquare />}
				onClick={() => setOpen(true)}
			>
				Sửa
			</Button>
			<Modal
				width={900}
				centered
				open={open}
				footer={false}
				onCancel={() => setOpen(false)}
			>
				{contextHolder}
				<Form
					layout="vertical"
					onFinish={updateUserSubmit}
					form={form}
					className="max-[600px]"
					initialValues={user}
				>
					<Form.Item name="firstname" label="Họ">
						<Input />
					</Form.Item>
					<Form.Item name="lastname" label="Tên">
						<Input />
					</Form.Item>
					<Form.Item name="email" label="Email">
						<Input disabled />
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
					<div className="flex justify-evenly">
						<Button
							htmlType="submit"
							className="bg-blue-300"
							loading={loading}
						>
							Sửa người dùng
						</Button>
						<Button htmlType="reset" className="bg-blue-300">
							Đặt lại
						</Button>
					</div>
				</Form>
			</Modal>
		</>
	);
};
