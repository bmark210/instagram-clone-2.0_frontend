import axios from "../../axios";

export async function fetchPostsByUserUsername(username: string) {
  const res = await axios.get(`/posts/p/` + username);
  return res.data;
}

export async function getPopularPosts() {
  const res = await axios.get("/posts/popular")
  return res.data
}
