import { Result } from "antd";
import { useNavigate } from "react-router-dom";

export const Page403 = () => {
	const nav = useNavigate();
	return (
		<Result
			status={403}
			title={403}
			subTitle="You are not allowed to access this resource!"
			extra={<button className="btn btn-primary" onClick={() => nav("/")}>Back to Home</button>}
		/>
	);
};
