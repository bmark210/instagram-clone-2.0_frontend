import axios from "../../../axios";

export const deleteAvatar = async (name: string) => {
  const res = await axios.patch("/avatar", { name });
  return res;
};

export const changeAvatarFieldInUser = async (avatar?: {
  name: string;
  downloadURL: string;
  type: string;
}) => {
  const res = await axios.patch("/users/avatar", avatar);
  return res.data;
};
