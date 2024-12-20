import { Form, Switch } from "antd";
import { IoMdCloseCircle } from "react-icons/io";
import { TextEditor } from "../../../../components/TextEditor";

export const AnswerItem = (props) => {
	const { index, name, restField, remove } = props;
	return (
		<>
			<div
				key={index}
				className="border-solid border-gray-200 border-2 rounded-md p-3 mb-3 relative"
			>
				<div
					className="absolute right-4 text-xl cursor-pointer z-10"
					onClick={() => remove(name)}
				>
					<IoMdCloseCircle />
				</div>
				<Form.Item
					{...restField}
					className="mt-3"
					name={[name, `content`]}
					label="Nội dung câu trả lời"
				>
					<TextEditor format={{ header: 4, bold: true }} />
				</Form.Item>
				<Form.Item
					{...restField}
					name={[name, `isCorrect`]}
					label="Đúng / Sai"
					initialValue={false}
				>
					<Switch />
				</Form.Item>
			</div>
		</>
	);
};
