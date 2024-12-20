import { api } from "../api"

export const register = async (data) => {
	const res = await api.post("/users/register", data);
	return res;
}