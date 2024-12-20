import { Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PaginationHandler } from "../../../components/Pagination";
import { getTestByCondition } from "../../../service/tests";
import { CardTest } from "./CardTest";
export const ContentClient = () => {
	const [listTest, setListTest] = React.useState([]);
	const [page, setPage] = React.useState({});
	const nav = useNavigate();
	const url = new URL(window.location.href);
	const urlHref = url.href;
	React.useEffect(() => {
		const params = {};
		for(const [key, value] of url.searchParams.entries()) {
			params[key] = value;
		}
		const loadData = async () => {
			let res = await getTestByCondition(params);
			if(res.data.response.page.totalPages <= 1 && params.page >= 2) {
				params.page = 1;
				res = await getTestByCondition(params);
			}
			setListTest(res.data.response.content);
			setPage(res.data.response.page);
		};
		loadData();
	}, [urlHref]);
	const changePage = (page) => {
		let params = url.searchParams;
		params.set("page", page);
		nav(url.href.replace(`${url.origin}`, ""));
	}
	return (
		<>
			<div className="container p-4">
				<Row gutter={[16, 16]}>
					{(listTest || []).map((item, index) => {
						return (
							<Col lg={12} xs={24} key={index}>
								<CardTest item={item} />
							</Col>
						);
					})}
				</Row>
				<PaginationHandler
					total={page.totalElements}
					pageSize={page.size}
					changePage={changePage}
				/>
			</div>
		</>
	);
};
