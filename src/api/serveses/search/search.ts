import axios from "../../../Axios";

export async function getUsersByQuery(query: string) {
  const { data } = await axios.get(`/users?query=${query}`);
  return data;
}
