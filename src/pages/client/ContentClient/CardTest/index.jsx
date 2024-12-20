import { Badge, Card, Image, Rate } from "antd";
import Logo from "../../../admin/images/quiz-logo-with-speech-bubble-icon_149152-812.avif";
import "./CardTest.scss";
import { useNavigate } from "react-router-dom";

export const CardTest = (props) => {
	const { item } = props;
	const categories = item.categories
		.map((category) => category.name)
		.join(", ");
	const nav = useNavigate();
	const detailTest = () => {
		nav(`/tests/detail/${item.id}`);
	};
	return (
		<>
			<Badge.Ribbon text={categories}>
				<Card hoverable onClick={detailTest}>
					<div className="d-flex">
						<Image src={Logo} height={"5rem"} />
						<div className="info ms-3">
							<div className="info__title">
								<strong>{item.title}</strong>
							</div>
							<div className="d-flex justify-content-between mt-3">
								<div>
									{item.questionResponses.length} Câu hỏi
								</div>
								<div>
									<Rate
										allowHalf
										defaultValue={item.rate}
										disabled
									/>
								</div>
							</div>
						</div>
					</div>
				</Card>
			</Badge.Ribbon>
		</>
	);
};
