import axios from "../../../Axios";

export async function addCaption(bio: string) {
  const data = await axios.patch("/users/caption", { bio });
  return data;
}
