import { Rate } from "antd";
import { getTestRatingByUser, ratingTest } from "../../../../../service/tests";
import { Notification } from "../../../../../components/Notification";
import { RxStarFilled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import React from "react";

export const Rating = (props) => {
	const { id, reloadData } = props;
	const nav = useNavigate();
	const [rate, setRate] = React.useState(0);
	const [contextHolder, openNotification] = Notification();
	React.useEffect(() => {
		const loadTestRatingByUser = async () => {
			try {
				const res = await getTestRatingByUser(id);
				setRate(res.data.response.rating);
			} catch(err) {

			}
		}
		loadTestRatingByUser();
	}, [id, reloadData]);
	const rating = async (value) => {
		try {
			await ratingTest(id, value);
			openNotification({
				type: "success",
				message: "Cảm ơn bạn vì đã đánh giá!",
			});
			reloadData();
		} catch (err) {
			if (err.status === 401) {
				nav("/login", { state: "unauthenticated" });
			} else if (err.status === 403) {
				nav("/unauthorized");
			} else if(err.status === 400) {
                openNotification({
                    type: "warning",
                    message: "Bạn phải tham gia trước khi đánh giá"
                })
            }
		}
	};
	return (
		<>
			{contextHolder}
			<div
				className="d-flex justify-content-between align-items-center p-3 mt-4"
				style={{ border: "2px solid #ddd" }}
			>
				<span>Đánh giá bài thi: </span>
				<Rate
					allowHalf
					allowClear
					value={rate}
					character={() => (
						<RxStarFilled
							style={{ stroke: "#D0CECB", strokeWidth: "1px" }}
						/>
					)}
					onChange={rating}
				/>
			</div>
		</>
	);
};
