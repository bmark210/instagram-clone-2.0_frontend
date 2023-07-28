import axios from "../../../axios";

export async function getAllSuggestions() {
  const { data } = await axios.get("/users/allsuggestions");
  return data;
}

export async function getFiveSuggestions() {
  const { data } = await axios.get("/users/suggestions");
  return data;
}