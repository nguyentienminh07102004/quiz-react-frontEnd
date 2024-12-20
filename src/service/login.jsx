import { api } from "../api"

export const loginAPI = async (dataLogin) => {
	const res = await api.post("/users/login", dataLogin);
	return res;
}