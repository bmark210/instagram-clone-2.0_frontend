import axios from "../../axios";

// export async function fetchUsers() {
//   const { data } = await axios.get("/users");
//   return data;
// }

export async function fetchPostsByUserId(userId: string) {
  const { data } = await axios.get(`/posts/p/` + userId);
  return data;
}

export async function getPopularPosts() {
  const { data } = await axios.get("/posts/popular");
  return data;
}
