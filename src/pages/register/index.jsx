import { Button, DatePicker, Form, Image, Input, Upload } from "antd";
import "./style.scss";
import { register } from "../../service/register";
import { useNavigate } from "react-router-dom";
import React from "react";

export function Register() {
	const nav = useNavigate();
	const RegisterUser = async (value) => {
		value = {
			...value,
			dateOfBirth: value["dateOfBirth"].format("YYYY-MM-DD"),
		};
		console.log(value);
		const res = await register(value);
		nav("/login?success");
	};
	const getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.onload = () => callback(reader.result);
		reader.readAsDataURL(img);
	};
	const [image, setImage] = React.useState(
		"https://th.bing.com/th/id/OIP._p7dSl1uR5eynQDkJyb1tgAAAA?rs=1&pid=ImgDetMain"
	);
	const uploadImage = (e) => {
		console.log(e.target.files[0]);
		getBase64(e.target.files[0], (url) => {
			setImage(url);
		});
	};
	return (
		<>
			<h1 className="m-5 text-center">Đăng ký tài khoản</h1>
			<Form
				className="form__register"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				onFinish={RegisterUser}
			>
				<Form.Item label="Họ" name="firstname">
					<Input />
				</Form.Item>
				<Form.Item label="Tên" name="lastname">
					<Input />
				</Form.Item>
				<Form.Item label="Email" name="email">
					<Input />
				</Form.Item>
				<Form.Item label="Địa chỉ" name="address">
					<Input />
				</Form.Item>
				<Form.Item label="Ngày tháng năm sinh" name="dateOfBirth">
					<DatePicker
						style={{ width: "100%" }}
						format={"DD-MM-YYYY"}
					/>
				</Form.Item>
				<Form.Item label="Mật khẩu" name="password">
					<Input.Password />
				</Form.Item>
				<Form.Item label="Nhập lại mật khẩu" name="rePassword">
					<Input.Password />
				</Form.Item>
				<Form.Item
					name="avatar"
					className="text-center"
					label="Ảnh đại diện"
				>
					<Input
						type="file"
						className="mb-3"
						onChange={uploadImage}
					/>
				</Form.Item>
				<div className="d-flex justify-content-center">
					<Image
						src={image}
						width={200}
						style={{ borderRadius: "50%" }}
						onChange={uploadImage}
					/>
				</div>
				<div className="d-flex justify-content-center mt-3">
					<Button htmlType="submit" type="primary">
						Đăng ký
					</Button>
				</div>
				<div className="flex justify-center mt-3 text-base">
					Bạn đã có tài khoản ?
					<span
						className="text-blue-500 cursor-pointer ms-2"
						onClick={() => nav("/login")}
					>
						Đăng nhập
					</span>
				</div>
			</Form>
		</>
	);
}
