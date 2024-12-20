import { Image, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaClipboardQuestion, FaUser } from "react-icons/fa6";
import { GrTest } from "react-icons/gr";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../../../public/images/quiz-guess-social-media-icon-in-flat-style-faq-illustration-on-isolated-background-help-button-sign-business-concept-vector.jpg";
import { FaHome } from "react-icons/fa";

export const LayoutDefault = () => {
	const nav = useNavigate();
	const url = new URL(window.location.href).pathname.trim();
	const [_, adminPrefix, entityName, action] = url.split('/');
	React.useEffect(() => {
		const isAdmin = localStorage.getItem("scope")?.includes("ADMIN");
		if (!isAdmin) nav("/unauthorized");
	}, [url]);
	const [collapse, setCollapse] = React.useState(false);
	const CollapseHandler = (value) => {
		setCollapse(value);
	};
	const items = [
		{
			key: "/admin/",
			label: "Trang chủ",
			icon: <FaHome />,
		},
		{
			key: "users",
			label: "Người dùng",
			icon: <FaUser />,
			children: [
				{
					key: "/admin/users/",
					label: <Link to="/admin/users/">Danh sách</Link>,
				},
				{
					key: "/admin/users/add",
					label: <Link to="/admin/users/add">Thêm người dùng</Link>,
				},
			],
		},
		{
			key: "categories",
			label: "Thể loại",
			icon: <BiSolidCategory />,
			children: [
				{
					key: "/admin/categories/add",
					label: (
						<Link to="/admin/categories/add">Thêm thể loại</Link>
					),
				},
				{
					key: "/admin/categories/",
					label: (
						<Link to="/admin/categories/">Danh sách thể loại</Link>
					),
				},
			],
		},
		{
			key: "questions",
			label: "Câu hỏi",
			icon: <FaClipboardQuestion />,
			children: [
				{
					key: "/admin/questions/",
					label: (
						<Link to="/admin/questions/">Danh sách câu hỏi</Link>
					),
				},
				{
					key: "/admin/questions/add",
					label: (
						<Link to={"/admin/questions/add"}>Thêm câu hỏi</Link>
					),
				},
			],
		},
		{
			key: "tests",
			label: "Bài thi",
			icon: <GrTest />,
			children: [
				{
					key: "/admin/tests/",
					label: <Link to={"/admin/tests/"}>Danh sách bài thi</Link>,
				},
				{
					key: "/admin/tests/add",
					label: <Link to={"/admin/tests/add"}>Thêm bài thi</Link>,
				},
			],
		},
	];
	return (
		<>
			<Layout>
				<Header className="h-28 sticky top-0 z-10 w-full p-0">
					<Image
						src={Logo}
						height="100%"
						preview={false}
						className="cursor-pointer"
						width={"auto"}
						style={{ marginLeft: !collapse ? "200px" : "80px" }}
					/>
				</Header>
				<Layout>
					<Sider
						className="fixed top-0 bottom-0 mt-28 h-screen overflow-auto"
						collapsible={true}
						onCollapse={CollapseHandler}
						collapsed={collapse}
						style={{ height: "100vh" }}
					>
						<Menu
							mode="inline"
							theme="dark"
							items={items}
							defaultSelectedKeys={[entityName.trim()]}
							defaultOpenKeys={[url.trim()]}
						/>
					</Sider>
					<Content
						className="p-5 relative"
						style={{ marginInlineStart: !collapse ? 200 : 80 }}
					>
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</>
	);
};
