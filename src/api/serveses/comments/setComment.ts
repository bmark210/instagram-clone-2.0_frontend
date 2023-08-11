import axios from "../../../axios";

export async function addComment(postId: string, commentText: string) {
  try {
    const res = await axios.post("/posts/comments", {
      postId,
      commentText,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getComments(postId: string) {
  try {
    const res = await axios.get(`/posts/comments/${postId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
