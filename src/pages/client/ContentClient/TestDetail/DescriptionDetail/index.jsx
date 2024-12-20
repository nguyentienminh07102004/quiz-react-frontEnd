import { Collapse } from "antd";

export const DescriptionDetail = (props) => {
	const { item } = props;
	const items = [
		{
			key: 1,
			label: "Mô tả",
			children: (
				<div dangerouslySetInnerHTML={{ __html: item.description }} />
			),
		},
	];
	return (
		<>
			<Collapse className="mt-2" items={items} defaultActiveKey={["1"]}/>
		</>
	);
};
