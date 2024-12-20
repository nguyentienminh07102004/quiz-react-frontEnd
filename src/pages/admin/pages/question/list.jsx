import { Button, Flex, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import React from "react";
import { getAllQuestions } from "../../../../service/questions";
import { PaginationHandler } from "../../../../components/Pagination";
import { Detail } from "./Button/Detail";
import { EditQuestion } from "./Button/Edit";
import { DeleteQuestion } from "./Button/Delete";

export const ListQuestion = () => {
	const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
	const [listQuestion, setListQuestion] = React.useState([]);
	const [pagination, setPagination] = React.useState({
		size: 0,
		totalElements: 0,
	});
	const [currentPage, setCurrentPage] = React.useState(1);
	React.useEffect(() => {
		const loadData = async () => {
			const res = await getAllQuestions(currentPage);
			let content = res.data.response.content;
			setSelectedRowKeys([]);
			content.forEach((element, index) => {
				element.index = index + 1;
				element.key = index + 1;
			});
			setListQuestion(content);
			setPagination(res.data?.response?.page);
		};
		loadData();
	}, [currentPage]);
	const rowSelections = {
		selectedRowKeys,
		onChange: (newSelectedRowKeys) => {
			setSelectedRowKeys(newSelectedRowKeys);
		},
	};
	return (
		<>
			<Table
				dataSource={listQuestion}
				rowSelection={rowSelections}
				pagination={false}
				bordered
			>
				<Column title="STT" key="id" dataIndex="index" />
				<Column title="Tiêu đề" key="title" dataIndex="title" />
				<Column
					title="Thể loại"
					key="category"
					dataIndex="category"
					render={(text) => {
						return (
							<Tag key={text} color="blue">
								{text.name.toUpperCase()}
							</Tag>
						);
					}}
				/>
				<Column
					title="Hành động"
					key="action"
					render={(text) => {
						return (
							<>
								<Detail className="bg-green-500" item={text} />
								<EditQuestion id={text.id} />
								<DeleteQuestion item={text.id} />
							</>
						);
					}}
				/>
			</Table>
			<Flex justify="end">
				<PaginationHandler
					total={pagination.totalElements}
					pageSize={pagination.size}
					changePage={setCurrentPage}
				/>
			</Flex>
		</>
	);
};
