import React from "react";
import { getAllCategoryNoPagination } from "../../../service/category";
import { SiderClientItem } from "./SiderClientItem";

export const SiderClient = () => {
	const [categoryList, setCategoryList] = React.useState([]);
	React.useEffect(() => {
		const loadData = async () => {
			const res = await getAllCategoryNoPagination();
			setCategoryList(res.data.response);
		};
		loadData();
	}, []);
	return (
		<>
			<div className="p-4">
				{(categoryList || []).map((item, index) => {
					return <SiderClientItem item={item} key={index} />;
				})}
			</div>
		</>
	);
};
