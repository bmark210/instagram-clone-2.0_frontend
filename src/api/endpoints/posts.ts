import axios from "../../axios";

// export async function fetchUsers() {
//   const { data } = await axios.get("/users");
//   return data;
// }

export async function fetchPostsByUserUsername(username: string) {
  const { data } = await axios.get(`/posts/p/` + username);
  return data;
}

export async function getPopularPosts() {
  const { data } = await axios.get("/posts/popular");
  return data;
}
