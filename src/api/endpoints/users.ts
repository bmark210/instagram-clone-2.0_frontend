import axios from "../../axios";
export async function fetchUserByUsername(username: string) {
  const data = await axios.get("/users/username/" + username);
  return data;
}

export async function fetchUserById(userId: string) {
  const data = await axios.get("/users/id/" + userId);
  return data;
}

export async function fetchStories() {
  const data = await axios.get("/users/stories");
  return data;
}
