import axios from "../../../axios";

export const deleteAvatar = async (name: string) =>
  await axios.patch("/avatar", { name }).then(res => {
    return res;
  });

export const avatarFieldToEmpty = async () => {
  await axios.patch("/users/avatar", { avatar: {} });
};
export const addAvatar = async (formData: FormData) => {
  const data = await axios.post("/avatar", formData);
  return data.data;
};

export const addAvatarFieldToUser = async (avatar: {
  name: string;
  downloadURL: string;
  type: string;
}) => {
  const res = await axios.patch("/users/avatar", avatar);
  return res.data;
};
