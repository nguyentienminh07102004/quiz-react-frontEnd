import { Col, Row } from "antd";
import React from "react";
import { getTestRelated } from "../../../../../service/tests";
import { CardTest } from "../../CardTest";

export const TestRelatedList = (props) => {
	const { categories, testId } = props;
	const [testRelated, setTestRelated] = React.useState([]);
	React.useEffect(() => {
		const loadData = async () => {
			if (categories && testId) {
				const TestRelatedList = await getTestRelated(
					testId,
					categories.map(category => category.code).join(", ")
				);
				setTestRelated(TestRelatedList.data.response);
			}
		};
		loadData();
	}, [categories, testId]);
	return (
		<Row gutter={[10, 10]}>
			{(testRelated || []).map((item) => {
				return (
					<Col key={item.id} xs={24}>
						<CardTest item={item} />
					</Col>
				);
			})}
		</Row>
	);
};
