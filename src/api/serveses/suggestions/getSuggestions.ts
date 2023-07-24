import axios from "../../../axios";

export async function getAllSuggestions() {
  const { data } = await axios.get("/users/allsuggestions");
  return data;
}
