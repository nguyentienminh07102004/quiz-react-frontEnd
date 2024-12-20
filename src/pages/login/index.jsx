import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useGoogleLogin } from "@react-oauth/google";
import { Button, Form, Input } from "antd";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { Notification } from "../../components/Notification";
import { loginAPI } from "../../service/login";
import { loginWithGithub, loginWithGoogle } from "../../service/user";

export const Login = () => {
	const nav = useNavigate();
	const [contextHolder, openNotification] = Notification();
	const loginGoogle = useGoogleLogin({
		flow: "auth-code",
		onSuccess: async (response) => {
			const res = await loginWithGoogle(response.code);
			successHandler(res);
		},
	});
	const loginGithub = () => {
		const CLIENT_ID = "Ov23liNkNrPx5xvGy1CN";
		const REDIRECT_URI = "http://localhost:5173/login?type=github";
		const SCOPE = "read:user,user:email";
		window.location.href = `https://github.com/login/oauth/authorize?
								client_id=${CLIENT_ID}
								&redirect_uri=${encodeURIComponent(REDIRECT_URI)}
								&scope=${SCOPE}`;
	};
	window.addEventListener("load", () => {
		const handleLoginGithub = async () => {
			const params = new URLSearchParams(window.location.search);
			const code = params.get("code");
			if (code) {
				const res = await loginWithGithub(code);
				successHandler(res);
			}
		};
		handleLoginGithub();
	});
	const data = useLocation();
	React.useEffect(() => {
		if (data.state === "unauthenticated") {
			localStorage.clear();
			openNotification({
				type: "warning",
				message: "Bạn phải đăng nhập trước",
			});
		}
	}, []);
	const Login = async (value) => {
		const res = await loginAPI(value).catch((err) => {
			openNotification({
				type: "warning",
				message: err.response.data.message,
			});
		});
		successHandler(res);
	};
	const successHandler = (res) => {
		if (res.status === 200) {
			const jwt = res.data.response;
			const payload = jwtDecode(jwt);
			localStorage.setItem("Email", payload["sub"]);
			localStorage.setItem("scope", payload["scope"]);
			if (payload["scope"].includes("ADMIN")) {
				nav("/admin/");
			} else {
				nav("/");
			}
		}
	};
	return (
		<>
			{contextHolder}
			<div className="flex items-center justify-center h-screen w-screen">
				<div className="border-solid border border-black flex flex-col justify-center items-center p-8 rounded-lg">
					<h2 className="mb-5 text-xl">Đăng nhập</h2>
					<div>
						<Form
							labelCol={{ sm: 4 }}
							labelWrap
							wrapperCol={{ sm: 20 }}
							onFinish={Login}
							className="w-40"
						>
							<Form.Item
								label="Email"
								rules={[
									{
										required: true,
										message: "Email is require!",
									},
								]}
								name="email"
							>
								<Input prefix={<UserOutlined />} />
							</Form.Item>
							<Form.Item
								label="Mật khẩu"
								rules={[
									{
										required: true,
										message: "Password is require!",
									},
								]}
								name="password"
							>
								<Input.Password prefix={<LockOutlined />} />
							</Form.Item>
							<div className="flex justify-center">
								<Button
									htmlType="submit"
									className="bg-blue-500"
								>
									Đăng nhập
								</Button>
							</div>
							<div className="flex justify-evenly mt-3">
								<Button
									onClick={loginGoogle}
									className="bg-white hover:bg-red-500"
									icon={<FcGoogle />}
								>
									Đăng nhập với Google
								</Button>
								<Button
									onClick={loginGithub}
									icon={<FaGithub />}
									className="bg-green-500"
								>
									Đăng nhập với Github
								</Button>
							</div>
							<div className="flex justify-center mt-3 text-md">
								<span className="text-blue-500 ms-2 cursor-pointer">
									Quên mật khẩu
								</span>
							</div>
							<div className="flex justify-center mt-3 text-md">
								Chưa có tài khoản ?
								<span
									className="text-blue-500 ms-2 cursor-pointer"
									onClick={() => nav("/register")}
								>
									Đăng ký
								</span>
							</div>
							<div className="flex justify-center">
								<Button
									className="bg-green-500"
									onClick={() => nav("/")}
								>
									Trở về trang chủ
								</Button>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
};
