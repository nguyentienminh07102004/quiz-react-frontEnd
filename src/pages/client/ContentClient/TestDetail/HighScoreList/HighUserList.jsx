import { HighUserItem } from "./ItemHighUser";

export const HighUserList = (props) => {
	const { items } = props;
	return <>
		{items.map((item, index) => {
			return <HighUserItem index={index} item={item} key={item.id} />
		})}
	</>
}