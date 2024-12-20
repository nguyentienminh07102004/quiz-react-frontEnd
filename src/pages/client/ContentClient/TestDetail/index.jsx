import { Alert, Col, Row } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import { getTestById } from "../../../../service/tests";
import { DescriptionDetail } from "./DescriptionDetail";
import { HighScoreList } from "./HighScoreList";
import { MainDetail } from "./MainDetail";
import { Rating } from "./Rating";
import { TestRelatedList } from "./TestRelated";
import { FaNoteSticky } from "react-icons/fa6";

export const TestDetail = () => {
	const { id } = useParams();
	const [detail, setDetail] = React.useState({});
	const [reload, setReload] = React.useState(false);
	React.useEffect(() => {
		const loadData = async () => {
			const res = await getTestById(id);
			setDetail(res.data.response);
		};
		loadData();
	}, [id, reload]);
	return (
		<>
			<Row gutter={[16, 16]}>
				<Col lg={15} xs={24}>
					<MainDetail item={detail} />
					<DescriptionDetail item={detail} />
					<Rating id={id} reloadData={() => setReload(!reload)} />
					<HighScoreList testId={id} />
				</Col>
				<Col lg={9} xs={24}>
					<Alert
						message="Các bài thi liên quan"
						className="mb-3 fs-5"
						icon={<FaNoteSticky />}
						showIcon
					/>
					<TestRelatedList
						categories={detail.categories}
						testId={id}
					/>
				</Col>
			</Row>
		</>
	);
};
