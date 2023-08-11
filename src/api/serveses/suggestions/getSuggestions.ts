import axios from "../../../axios";

export async function getAllSuggestions() {
  const res = await axios.get("/users/allsuggestions");
  return res.data;
}

export async function getFiveSuggestions() {
  const res = await axios.get("/users/suggestions");
  return res.data;
}
