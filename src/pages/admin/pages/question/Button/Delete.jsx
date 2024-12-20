import { Button, Popconfirm } from "antd";
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteQuestionByIdService } from "../../../../../service/questions";

export const DeleteQuestion = ({ item }) => {
	const confirm = async () => {
		try {
			await deleteQuestionByIdService(item);
		} catch(err) {
			console.log(err);
		}
	}
	return (
		<>
			<Popconfirm
				title="Xoá câu hỏi này"
				description="Bạn chắc chắn muốn xoá câu hỏi này?"
				onConfirm={confirm}
				okText="Chắc chắn"
				cancelText="Huỷ"
			>
				<Button icon={<FaRegTrashCan />} className="bg-red-400">
					Xoá
				</Button>
			</Popconfirm>
		</>
	);
};
