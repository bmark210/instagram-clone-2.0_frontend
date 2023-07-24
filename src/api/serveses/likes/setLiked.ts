import axios from "../../../Axios";

export async function setPostLiked(postId: string) {
  const data = await axios.patch(`/posts`, { postId });
  return data;
}

export async function removePostLiked(postId: string) {
  const data = await axios.patch(`/posts`, { postId });
  return data;
}
