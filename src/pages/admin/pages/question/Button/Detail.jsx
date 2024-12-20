import { Button, Checkbox, Descriptions, Modal } from "antd";
import React from "react";
import { FaBookOpen } from "react-icons/fa";

export const Detail = (props) => {
	const { className, item } = props;
	const [open, setOpen] = React.useState(false);
	const data = [
		{
			key: "id",
			label: "Id câu hỏi",
			children: item.id,
			span: 24,
		},
		{
			key: "title",
			label: "Tiêu đề câu hỏi",
			children: item.title,
			span: 24,
		},
		{
			key: "category",
			label: "Thể loại",
			children: `${item.category?.name} (mã là: ${item.category?.code})`,
			span: 24,
		},
		{
			key: "shortDescription",
			label: "Mô tả ngắn",
			children: (
				<div
					dangerouslySetInnerHTML={{
						__html:
							item.shortDescription ||
							`<span className="opacity-50">(Trống)</span>`,
					}}
				/>
			),
			span: 24,
		},
		{
			key: "content",
			label: "Nội dung câu hỏi",
			children: (
				<div dangerouslySetInnerHTML={{ __html: item.content }} />
			),
			span: 24,
		},
		{
			key: "answers",
			label: "Câu trả lời",
			span: 24,
			children: (
				<div>
					{item.answers.map((answer) => (
						<div key={answer.id}>
							<Checkbox checked={answer.isCorrect}>
								<div
									className="text-black"
									dangerouslySetInnerHTML={{
										__html: answer.content,
									}}
								/>
							</Checkbox>
						</div>
					))}
				</div>
			),
		},
	];
	return (
		<>
			<Button
				className={className}
				icon={<FaBookOpen />}
				onClick={() => setOpen(true)}
			>
				Chi tiết
			</Button>
			<Modal
				title="Chi tiết câu hỏi"
				open={open}
				footer={false}
				onCancel={() => setOpen(false)}
			>
				<Descriptions
					items={data}
					bordered
					column={24}
					layout="vertical"
				/>
			</Modal>
		</>
	);
};
