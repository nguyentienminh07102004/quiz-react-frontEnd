import { Button, Table } from "antd";
import React from "react";
import { getTestByCondition } from "../../../../service/tests";

export const ListTest = () => {
	const [currentPage, setCurrentPage] = React.useState(1);
	const [listTest, setListTest] = React.useState([]);

	React.useEffect(() => {
		const loadData = async () => {
			const resTest = await getTestByCondition();
			res.data.response.content.forEach((item) => (item.key = item.id));
			setListTest(res.data.response.content);
		};
		loadData();
	}, []);
	const columns = [
		{
			title: "Tiêu đề",
			key: "title",
			dataIndex: "title",
		},
		{
			title: "Độ khó",
			key: "difficulty",
			dataIndex: "difficulty",
		},
		{
			title: "Số lượng câu hỏi",
			key: "numOfQuestions",
			render: (text) => text.questionResponses?.length,
		},
		{
			key: "rate",
			title: "Đánh giá",
			render: (text) => {
				return text.rate || 0;
			},
		},
		{
			key: "action",
			title: "Hành động",
			render: (text) => {
				return (
					<>
						<Button>Chi tiết</Button>
						
					</>
				);
			},
		},
	];
	return (
		<>
			<Table columns={columns} dataSource={listTest} bordered />
		</>
	);
};
