import axios from "../../../axios";

export const deleteAvatarFieldInUser = async (name: string) => {
  const res = await axios.patch("/avatar", { name });
  return res;
};

export const addAvatarFieldInUser = async (formData: FormData) => {
  const res = await axios.post("/avatar", formData);
  return res.data;
};

export const changeAvatarFieldInUser = async (avatar?: {
  name: string;
  downloadURL: string;
  type: string;
}) => {
  const res = await axios.patch("/users/avatar", avatar);
  return res.data;
};
