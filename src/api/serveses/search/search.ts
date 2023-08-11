import axios from "../../../axios";

export async function getUsersByQuery(query: string) {
  const res = await axios.get(`/users?query=${query}`);
  return res.data;
}
