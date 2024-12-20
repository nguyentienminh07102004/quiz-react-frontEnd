import { Collapse } from "antd";
import React from "react";
import { getTopUserHighScore } from "../../../../../service/testDetail";
import { HighUserList } from "./HighUserList";

export const HighScoreList = (props) => {
	const { testId } = props;
	const [listUserHigh, setListUserHigh] = React.useState([]);
	React.useEffect(() => {
		const loadData = async () => {
			const res = testId ? await getTopUserHighScore(testId, 3) : null;
			if (res) {
				setListUserHigh([{
					key: 1,
					children: <HighUserList items={res.data.response} />,
					label: "Bảng xếp hạng"
				}]);
			}
		};
		loadData();
	}, [testId]);
	return (
		<>
			<Collapse items={listUserHigh} className="mt-4" defaultActiveKey={["1"]} />
		</>
	);
};
