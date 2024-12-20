import { Pagination } from "antd";

export const PaginationHandler = (props) => {
	const { total, pageSize, changePage } = props;
	const handleChangePagination = (value) => {
		changePage(value);
	}
	return (
		<>
			<Pagination
				align="center"
				defaultCurrent={1}
				total={total}
				pageSize={pageSize}
				className="mt-3"
				onChange={handleChangePagination}
			/>
		</>
	);
};
