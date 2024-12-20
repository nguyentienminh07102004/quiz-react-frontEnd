import { Badge, Button, Card, Image, Rate } from "antd";
import React from "react";
import { CiShare2 } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { saveTestDetail } from "../../../../../service/testDetail";
import Logo from "../../../../admin/images/quiz-logo-with-speech-bubble-icon_149152-812.avif";

export const MainDetail = (props) => {
	const { item } = props;
	const nav = useNavigate();
	const categories = item?.categories
		?.map((category) => category.name)
		.join(", ");
	const doTest = async () => {
		const res = await saveTestDetail({ testId: item.id }).catch((err) => {
			if (err.status === 401) {
				nav("/login", { state: "unauthenticated" });
			} else if(err.status === 403) {
				nav("/unauthorized");
			}
		});
		const data = {
			createdBy: res.data.response.createdBy,
			testId: item.id,
			createdDate: res.data.response.createdDate,
			test: res.data.response.test,
			id: res.data.response.id,
		};
		nav("/test/", { state: data });
	};
	return (
		<Badge.Ribbon text={categories}>
			<Card className="p-1">
				<div className="d-flex">
					<Image src={Logo} width={100} />
					<div className="flex-fill ms-3">
						<strong className="fs-4">{item.title}</strong>
						<div className="d-flex justify-content-between">
							<div>
								<Button
									color="primary"
									variant="filled"
									className="me-2"
									onClick={doTest}
								>
									Chơi ngay
									<FaPlay />
								</Button>
								<Button color="primary" variant="filled">
									Chia sẻ
									<CiShare2 />
								</Button>
							</div>
							<div className="d-flex align-items-center">
								<Rate
									allowHalf
									value={item.rate || 0}
									disabled
								/>
								<strong className="ms-2">
									({item.rate} / {item.ratingResponses?.length} đánh
									giá)
								</strong>
							</div>
						</div>
					</div>
				</div>
			</Card>
		</Badge.Ribbon>
	);
};
