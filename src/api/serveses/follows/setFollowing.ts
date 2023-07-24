import axios from "../../../Axios";

export async function updateFollowersByUserId(userIdToUpdateFollowers: string) {
  const data = await axios.patch("/users/followers", {
    userIdToUpdateFollowers,
  });
  return data;
}
export async function updateFollowingsByUserId(userIdToFollow: string) {
  const data = await axios.patch("/users/followings", { userIdToFollow });
  return data;
}
