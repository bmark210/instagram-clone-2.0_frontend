import axios from "../../../axios";

export const deleteAvatar = async (name: string) =>
  await axios.patch("/avatar").then(res => {
    return res;
  });
