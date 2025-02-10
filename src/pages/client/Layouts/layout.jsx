import { Button, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../../../../public/images/pngtree-quiz-logo-icon-vector-png-image_3129090.jpg";
import { SiderClient } from "../SiderClient";
import { UserInfo } from "../user";

export const LayoutDefaultClient = () => {
	const nav = useNavigate();
	return (
		<>
			<Layout>
				<Header
					style={{ paddingLeft: "200px", height: "100px" }}
					className="flex items-center justify-between"
				>
					<img
						src={Logo}
						height="100%"
						className="cursor-pointer"
						onClick={() => nav("/")}
					/>
					<div className="flex items-center justify-evenly">
						<Button className="me-3" onClick={() => nav("/test/details")}>Lịch sử bài thi</Button>
						<UserInfo />
					</div>
				</Header>
				<Layout>
					<Sider breakpoint="md" collapsedWidth={0}>
						<div className="demo-logo-vertical" />
						<SiderClient />
					</Sider>
					<Content className="p-3">
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</>
	);
};
