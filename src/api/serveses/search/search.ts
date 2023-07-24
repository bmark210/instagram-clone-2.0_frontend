import axios from "../../../axios";

export async function getUsersByQuery(query: string) {
  const { data } = await axios.get(`/users?query=${query}`);
  return data;
}
