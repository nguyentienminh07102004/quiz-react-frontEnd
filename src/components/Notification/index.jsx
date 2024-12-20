import { notification } from "antd";

export function Notification() {
	const [api, contextHolder] = notification.useNotification();
	const openNotification = (props) => {
		const { type, message, description, duration, placement } = props;
		api[type || "open"]({
			message: message,
			description: description,
			duration: duration || 5,
			placement: placement || "topRight",
			showProgress: true,
			pauseOnHover: false
		});
	}
	return [contextHolder, openNotification];
}