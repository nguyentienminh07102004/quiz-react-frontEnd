import { Checkbox } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export const SiderClientItem = (props) => {
	const { item } = props;
	const nav = useNavigate();
	const [checked, setChecked] = React.useState(false);
	const searchCategory = () => {
		const url = new URL(window.location.href);
		let params = url.searchParams;
		const category = params.get("category");
		if (!checked) {
			if (!category) {
				params.set("category", item.code);
			} else {
				let categorySet = new Set(category.split(/,\s+/));
				categorySet.add(item.code);
				params.set("category", Array.from(categorySet).join(", "));
			}
		} else {
			let categorySet = new Set(category.split(new RegExp(",\\s+")));
			console.log(categorySet.delete(item.code));
			params.set("category", Array.from(categorySet).join(", "));
		}
		setChecked(!checked);
		nav(url.href.replace(`${url.origin}`, ""));
	};
	return (
		<div
			className="p-2 text-center rounded fs-6 bg-primary mb-3 flex justify-evenly items-center"
			style={{ cursor: "pointer" }}
			onClick={searchCategory}
		>
			<div className="text-center w-1/4">
				<Checkbox checked={checked} />
			</div>
			<span className="text-center flex-1">{item.name}</span>
		</div>
	);
};
