import axios from "../../../Axios";

export async function addComment(postId: string, commentText: string) {
  try {
    const { data } = await axios.post("/posts/comments", {
      postId,
      commentText,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getComments(postId: string) {
  try {
    const { data } = await axios.get(`/posts/comments/${postId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
