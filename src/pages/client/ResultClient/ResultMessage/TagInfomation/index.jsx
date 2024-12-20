export const TagInformation = (props) => {
	const { title, description } = props;
	return (
		<>
			<div className="flex justify-between">
				<span
					style={{
						color: "#9CA3AF",
						display: "flex",
						alignItems: "center",
						fontSize: "1rem",
						width: "40%",
					}}
				>
					{title}
				</span>
				<strong className="flex justify-end items-center">
					{description}
				</strong>
			</div>
		</>
	);
};
