import { Button, DatePicker, Form, Image, Input, Modal } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Notification } from "../../../components/Notification";
import {
	changePassword,
	getMyInfo,
	logout,
	updateUser,
} from "../../../service/user";

export const UserInfo = () => {
	const [data, setData] = React.useState({});
	const [open, setOpen] = React.useState(false);
	const [reload, setReload] = React.useState(false);
	const [openChangePassword, setOpenChangePassword] = React.useState(false);
	React.useEffect(() => {
		const loadData = async () => {
			const res = await getMyInfo();
			const data = res.data.response;
			if (
				data.dateOfBirth != null &&
				typeof data.dateOfBirth === "string"
			)
				data.dateOfBirth = dayjs(
					data.dateOfBirth.split("/").reverse().join("-")
				);
			setData(res.data.response);
		};
		loadData();
	}, [reload]);
	const nav = useNavigate();
	const [contextHolder, openNotification] = Notification();
	const UpdateUser = async (value) => {
		try {
			value.id = data.id;
			value.avatar = data.avatar;
			value.status = data.status;
			await updateUser(value);
			openNotification({
				type: "success",
				message: "Thành công",
			});
			setReload(!reload);
			setOpen(false);
		} catch (err) {
			openNotification({
				type: "warning",
				message: "Thất bại",
			});
		}
	};
	const changePasswordUser = async (value) => {
		try {
			await changePassword(value);
			localStorage.clear();
			setOpenChangePassword(false);
			nav("/");
			openNotification({
				type: "success",
				message: "Thay đổi thành công! Vui lòng đăng nhập lại!",
				duration: 10,
			});
		} catch (err) {
			openNotification({
				type: "warning",
				message: "Thay đổi thất bại!",
				description: err.response.data.message,
			});
		}
	};
	const changePasswordButton = async () => {
		setOpen(false);
		setOpenChangePassword(true);
	};

	const logoutData = async () => {
		await logout();
		setOpen(false);
		nav("/");
	};
	const handleClick = () => {
		localStorage.getItem("scope") !== null ? setOpen(true) : nav("/login");
	};
	return (
		<>
			{contextHolder}
			<Image
				src={"/images/avatar-vo-danh-004.jpg"}
				style={{ borderRadius: "50%" }}
				width={80}
				className="cursor-pointer"
				preview={false}
				onClick={handleClick}
			/>
			<Modal
				title="Thông tin của bạn"
				open={open}
				onCancel={() => setOpen(false)}
				footer={null}
			>
				<Form
					initialValues={data}
					layout="vertical"
					onFinish={UpdateUser}
				>
					<Form.Item name="firstname" label="Họ">
						<Input />
					</Form.Item>
					<Form.Item name="lastname" label="Tên">
						<Input />
					</Form.Item>
					<Form.Item name="email" label="Email:">
						<Input disabled />
					</Form.Item>
					<Form.Item label="Ngày tháng năm sinh" name="dateOfBirth">
						<DatePicker className="w-full" />
					</Form.Item>
					<Form.Item name="address" label="Địa chỉ:">
						<Input />
					</Form.Item>
					<Form.Item name="roles" label="Quyền hạn">
						<Input disabled />
					</Form.Item>
					<div className="flex justify-evenly">
						<Button className="bg-blue-500" htmlType="submit">
							Thay đổi
						</Button>
						<Button
							className="bg-blue-500"
							onClick={changePasswordButton}
						>
							Đổi mật khẩu
						</Button>
						<Button className="bg-blue-500" onClick={logoutData}>
							Đăng xuất
						</Button>
					</div>
				</Form>
			</Modal>
			<Modal
				open={openChangePassword}
				onCancel={() => {
					setOpenChangePassword(false);
					setOpen(true);
				}}
				title="Thay đổi mật khẩu"
				footer={false}
			>
				<Form layout="vertical" onFinish={changePasswordUser}>
					<Form.Item
						name="oldPassword"
						label="Nhập mật khẩu cũ"
						rules={[{ require: true, message: "Đây là bắt buộc" }]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						name="newPassword"
						label="Mật khẩu mới"
						rules={[{ require: true, message: "Đây là bắt buộc" }]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						name="reNewPassword"
						label="Nhập lại mật khẩu mới"
						rules={[{ require: true, message: "Đây là bắt buộc" }]}
					>
						<Input.Password />
					</Form.Item>
					<div className="flex justify-center">
						<Button htmlType="submit" className="bg-blue-300">
							Thay đổi
						</Button>
					</div>
				</Form>
			</Modal>
		</>
	);
};
