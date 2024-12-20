export const HighUserItem = (props) => {
	const { index, item } = props;
	const minute = String(Math.floor(item.totalTime / 60)).padStart(2, "0");
	const seconds = String(item.totalTime % 60).padStart(2, "0");
	return (
		<>
			<div className="d-flex justify-content-between border-dark border-2 p-2 mb-2 rounded">
				<div className="d-flex justify-content-between align-items-center">
					<div className="rounded-circle d-flex justify-content-center align-items-center bg-info p-2">
						{index + 1}
					</div>
					<div>{item.createdBy}</div>
				</div>
				<div className="d-flex flex-column justify-content-end">
					<div>
						{item.score || 0} /{" "}
						{item?.test?.questionResponses?.length || 0} (câu)
					</div>
					<div>
						{minute} : {seconds}
					</div>
				</div>
			</div>
		</>
	);
};
