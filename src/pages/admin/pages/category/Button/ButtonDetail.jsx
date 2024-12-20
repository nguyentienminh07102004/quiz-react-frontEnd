import { Button, Descriptions, Modal, Tag } from "antd";
import React from "react";
import { FaBookOpen } from "react-icons/fa6";

export const ButtonDetail = (props) => {
	const { item, className } = props;
	const [isOpen, setIsOpen] = React.useState(false);
	const data = [
		{
			key: "code",
			label: "Mã",
			span: 12,
			children: (
				<Tag.CheckableTag checked>
					<div dangerouslySetInnerHTML={{ __html: item.code }} />
				</Tag.CheckableTag>
			),
		},
		{
			key: "name",
			label: "Tên",
			span: 12,
			children: (
				<Tag.CheckableTag checked>
					<div dangerouslySetInnerHTML={{ __html: item.name }} />
				</Tag.CheckableTag>
			),
		},
		{
			key: "description",
			label: "Mô tả",
			span: 24,
			children: (
				<p dangerouslySetInnerHTML={{ __html: item.description }} />
			),
		},
	];
	return (
		<>
			<Button
				className={className}
				onClick={() => setIsOpen(true)}
				icon={<FaBookOpen />}
			>
				Chi tiết
			</Button>
			<Modal
				open={isOpen}
				onCancel={() => setIsOpen(!isOpen)}
				onClose={() => setIsOpen(!isOpen)}
				onOk={() => setIsOpen(!isOpen)}
			>
				<Descriptions size="small" bordered items={data} column={24} title="Chi tiết thể loại" />
			</Modal>
		</>
	);
};
