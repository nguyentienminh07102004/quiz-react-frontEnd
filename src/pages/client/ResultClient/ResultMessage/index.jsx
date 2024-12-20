import { Alert, Card, Col, Progress, Row } from "antd";
import { TagInformation } from "./TagInfomation";

export const ResultMessage = (props) => {
	const { item } = props;
	const percentSuccess = (
		(item?.score / (item?.test?.questionResponses?.length || 1)) *
		100
	).toFixed(2);
	return (
		<Row className="mb-3 flex justify-center items-center" gutter={[30]}>
			<Col xl={12} xs={24} className="flex items-center justify-center">
				<Progress
					type="circle"
					percent={percentSuccess}
					strokeLinecap="butt"
					format={() => `${percentSuccess} %`}
				/>
				<div className="flex flex-col ms-5 justify-between">
					<Card className="mb-3">
						<TagInformation
							title="Tổng thời gian"
							description={(item?.totalTime || 0) + "s"}
						/>
					</Card>
					<Card>
						<TagInformation
							title="Bắt đầu"
							description={new Date(
								item.createdDate || 0
							).toLocaleString("vi-VN", {
								timeZone: "Asia/Ho_Chi_Minh",
							})}
						/>
					</Card>
					<Card className="mt-3">
						<TagInformation
							title="Số câu đúng"
							description={item?.score + " câu"}
						/>
					</Card>
				</div>
			</Col>
			<Col xl={12} xs={24} className="flex items-center">
				<Card title="Chi tiết bài thi" style={{ width: "60%" }}>
					<Alert
						message="Số câu đúng:"
						className="text-success"
						action={<span>{item?.score}</span>}
					/>
					<Alert
						message="Số câu sai:"
						className="mt-3 text-danger"
						action={
							<span>
								{item?.test?.questionResponses?.length -
									item?.score}
							</span>
						}
					/>
				</Card>
			</Col>
		</Row>
	);
};
