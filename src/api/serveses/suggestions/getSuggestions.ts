import axios from "../../../Axios";

export async function getAllSuggestions() {
  const { data } = await axios.get("/users/allsuggestions");
  return data;
}
