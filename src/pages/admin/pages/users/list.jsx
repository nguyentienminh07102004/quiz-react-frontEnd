import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { Table, Tag } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Notification } from "../../../../components/Notification";
import { deleteUser, getAllUsers } from "../../../../service/user";
import { DetailUser } from "./DetailUser";
import { EditUser } from "./EditUser";

export const ListUser = () => {
	const [listUser, setListUser] = React.useState([]);
	const [pagination, setPagination] = React.useState({ page: 1 });
	const emailUser = localStorage.getItem("Email");
	const [reload, setReload] = React.useState(false);
	const [contextHolder, openNotification] = Notification();
	const deleteSoftUser = async (id) => {
		try {
			await deleteUser(id);
			openNotification({
				type: "success",
				message: "Thay đổi trạng thái thành công",
			});
			setReload(!reload);
		} catch (err) {
			openNotification({
				type: "warning",
				message: "Thất bại",
			});
		}
	};
	const nav = useNavigate();
	const columns = [
		{
			key: `fullName`,
			title: "Họ và tên",
			render: (_, text) => {
				return text.firstname || "_" + " " + (text.lastname || "_");
			},
		},
		{
			key: "Email",
			title: "Email",
			dataIndex: "email",
		},
		{
			key: "dateOfBirth",
			title: "Ngày tháng năm sinh",
			dataIndex: "dateOfBirth",
		},
		{
			key: "roles",
			title: "Quyền hạn",
			dataIndex: "roles",
			render: (text) => {
				return (
					<>
						{text.map((role, index) => (
							<Tag color="blue" key={index}>
								{role}
							</Tag>
						))}
					</>
				);
			},
		},
		{
			key: "status",
			title: "Trạng thái",
			dataIndex: "status",
			render: (text, record) => {
				const isActive = text === "ACTIVE";
				return (
					<>
						{!record.roles.includes("ADMIN") && (
							<>
								<Tag
									color={isActive ? "green" : "red"}
									onClick={() => deleteSoftUser(record.id)}
									className="cursor-pointer"
									icon={
										!isActive ? (
											<LockOutlined />
										) : (
											<UnlockOutlined />
										)
									}
								>
									<span className="text-xs">{text}</span>
								</Tag>
							</>
						)}
					</>
				);
			},
		},
		{
			title: "Hành động",
			render: (text) => {
				return (
					<>
						<DetailUser user={text} />
						{!text.roles.includes("ADMIN") && (
							<>
								<EditUser
									reload={() => setReload(!reload)}
									user={text}
								/>
							</>
						)}
					</>
				);
			},
		},
	];
	React.useEffect(() => {
		const loadData = async () => {
			try {
				const res = await getAllUsers();
				res.data.response.content.forEach(
					(item) => (item.key = item.id)
				);
				setListUser(res.data.response.content);
				setPagination(res.data.response.page);
			} catch (err) {
				if (err.status === 401) {
					nav("/login", { state: "unauthenticated" });
				}
			}
		};
		loadData();
	}, [reload]);
	return (
		<>
			{contextHolder}
			<Table
				dataSource={listUser}
				columns={columns}
				pagination={false}
				bordered
			/>
		</>
	);
};
