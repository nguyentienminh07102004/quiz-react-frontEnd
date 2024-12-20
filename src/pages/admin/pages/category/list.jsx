import { Table } from "antd";
import Column from "antd/es/table/Column";
import React from "react";
import { deleteCategory, getAllCategory } from "../../../../service/category";
import { ButtonDelete } from "./Button/ButtonDelete";
import { ButtonDetail } from "./Button/ButtonDetail";
import { ButtonEdit } from "./Button/ButtonEdit";
import { PaginationHandler } from "../../../../components/Pagination";
import { Notification } from "../../../../components/Notification";

export const ListCategory = () => {
	const [ListCategory, setListCategory] = React.useState([]);
	const [isReload, setIsReload] = React.useState(false);
	const reload = () => setIsReload(!isReload);
	const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [contextHolderNotification, openNotification] = Notification();
	const [pagination, setPagination] = React.useState({
		totalElements: 1,
		size: 10,
	});
	const selectedRow = {
		selectedRowKeys,
		onChange: (newSelected) => {
			setSelectedRowKeys(newSelected);
		},
	};
	React.useEffect(() => {
		const loadData = async () => {
			const res = await getAllCategory(currentPage);
			const content = res?.response?.content;
			content.forEach((element, index) => {
				element.key = index;
				element.index = index + 1;
			});
			setListCategory(content);
			setPagination(res?.response?.page);
		};
		loadData();
	}, [isReload, currentPage]);
	return (
		<>
			{contextHolderNotification}
			<Table
				dataSource={ListCategory}
				pagination={false}
				bordered
				rowSelection={selectedRow}
			>
				<Column title="STT" key="index" dataIndex="index" />
				<Column title="Mã" dataIndex="code" key="code" />
				<Column title="Tên" dataIndex="name" key="name" />
				<Column
					title="Hành động"
					key="action"
					render={(_, text) => {
						return (
							<div className="flex justify-start items-center">
								<ButtonDetail
									item={text}
									className="bg-green-300 me-3"
								/>
								<ButtonEdit
									item={text}
									reload={reload}
									className="bg-blue-400 me-3"
								/>
								<ButtonDelete
									title="Xoá thể loại này?"
									className="bg-red-300"
									id={text.code}
									reload={reload}
									deleteFunc={deleteCategory}
									successFunc={openNotification}
								/>
							</div>
						);
					}}
				/>
			</Table>
			<div className="flex justify-end">
				<PaginationHandler
					total={pagination?.totalElements}
					pageSize={pagination?.size}
					changePage={setCurrentPage}
				/>
			</div>
		</>
	);
};
