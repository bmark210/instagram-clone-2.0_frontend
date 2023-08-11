import axios from "../../axios";
export async function fetchUserByUsername(username: string) {
  const data = await axios.get("/users/username/" + username);
  return data;
}

export async function fetchUserById(userId: string) {
  const data = await axios.get("/users/id/" + userId);
  return data;
}
