import axios from "../../axios";
import { Fields } from "../../interfaces/fields";

export async function fetchPostsByUserUsername(username: string) {
  const res = await axios.get(`/posts/p/` + username);
  return res.data;
}

export async function getPopularPosts() {
  const res = await axios.get("/posts/popular");
  return res.data;
}

export async function addPostDataInFieldToUser(fields: Fields) {
  const res = axios.post("/posts/create", fields);
  return res;
}
