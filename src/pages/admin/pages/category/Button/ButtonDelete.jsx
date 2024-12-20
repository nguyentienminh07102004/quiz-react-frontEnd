import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";

export const ButtonDelete = (props) => {
	const { title, description, deleteFunc, id, className, reload, successFunc } = props;
	const [modal, contextHolder] = Modal.useModal();
	const deleteItem = async () => {
		try {
			await deleteFunc(id);
			successFunc({
				type: "success",
				message: "Xoá thành công!",
			});
			reload();
		} catch (err) {
			successFunc({
				type: "warning",
				message: "Xoá thất bại",
			});
		}
	};
	const confirmDelete = () => {
		modal.confirm({
			title: title || "Bạn chắc chắn muốn xoá?",
			icon: React.createElement(ExclamationCircleFilled),
			content: description,
			onOk: async () => {
				await deleteItem();
			},
		});
	};
	return (
		<>
			{contextHolder}
			<Button
				className={className}
				icon={<FaRegTrashCan />}
				onClick={confirmDelete}
			>
				Xoá
			</Button>
			<Modal></Modal>
		</>
	);
};
