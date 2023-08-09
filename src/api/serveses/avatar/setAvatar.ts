import axios from "../../../axios";

export const deleteAvatar = async (name: string) =>
  await axios.patch("/avatar", { name }).then(res => {
    return res;
  });

export const avatarFieldToEmpty = async () => {
  await axios.patch("/users/avatar", { avatar: {} });
};
