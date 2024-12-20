import { Button, Descriptions, Modal } from "antd";
import React from "react";
import { FaBookOpen } from "react-icons/fa6";

export const DetailUser = (props) => {
	const { user } = props;
	const [open, setOpen] = React.useState(false);
	const items = [
		{
			label: "Họ và tên",
			children: user.firstname || "_" + " " + (user.lastname || "_"),
			span: {
				sm: 24,
				xs: 24
			}
		},
		{
			label: "Ngày tháng năm sinh",
			children: user.dateOfBirth,
			span: {
				sm: 24,
				xs: 24
			}
		},
		{
			label: "Địa chỉ",
			children: user.address,
			span: {
				sm: 24,
				xs: 24
			}
		},
		{
			label: "Email",
			children: user.email,
			span: {
				sm: 24,
				xs: 24
			}
		},
		{
			label: "Quyền hạn",
			children: user.roles,
			span: {
				sm: 24,
				xs: 24
			}
		}
	];
	return (
		<>
			<Button onClick={() => setOpen(true)} className="bg-green-300" icon={<FaBookOpen />}>
				Chi tiết
			</Button>
			<Modal
				title="Chi tiết thông tin"
				open={open}
				onOk={() => setOpen(false)}
				onCancel={() => setOpen(false)}
				onClose={() => setOpen(false)}
				cancelButtonProps={false}
			>
				<Descriptions items={items} bordered layout="vertical" column={24} />
			</Modal>
		</>
	);
};
