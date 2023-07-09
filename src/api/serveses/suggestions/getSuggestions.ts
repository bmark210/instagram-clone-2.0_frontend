import axios from "../../../axios";

export async function getSuggestionsIfJustLoggedIn() {
  const { data } = await axios.get("/users/suggestions");
  return data;
}

export async function getAllSuggestions() {
  const { data } = await axios.get("/users/allsuggestions");
  return data;
}
