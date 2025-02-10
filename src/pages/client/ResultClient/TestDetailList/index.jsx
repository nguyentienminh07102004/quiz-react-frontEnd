import { Card } from "antd";
import React from "react";
import { getMyTestDetail } from "../../../../service/testDetail";
import { useNavigate } from "react-router-dom";

export const TestDetailList = () => {
	const [testDetailList, setTestDetailList] = React.useState([]);
	const nav = useNavigate();
	React.useEffect(() => {
		const loadData = async () => {
			const res = await getMyTestDetail();
			setTestDetailList(res.data.response);
		};
		loadData();
	}, []);
	return (
		<>
			<h1 className="text-2xl mb-4">Danh sách bài thi đã làm</h1>
			{testDetailList.map((testDetail) => (
				<>
					<Card
						title={testDetail.test.title}
						className="cursor-pointer"
						onClick={() => nav(`/result/${testDetail.id}`)}
					>
						<p>Điểm số: {testDetail.score} / {testDetail.test?.questionResponses?.length}</p>
						<p>Thời gian bắt đầu: {new Date(testDetail.createdDate).toUTCString()}</p>
						<p>Tổng thời gian làm bài: {testDetail.totalTime} s</p>
					</Card>
				</>
			))}
		</>
	);
};
