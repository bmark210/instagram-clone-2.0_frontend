import { AddPostAction, Post, fetchSuccessPostsAction } from "./post";

export const fetchPostsSuccess = (posts: Post[]): fetchSuccessPostsAction => ({
  type: "FETCH_POSTS_SUCCESS",
  payload: posts,
});

export const addPost = (post: Post): AddPostAction => ({
  type: "ADD_POST",
  payload: post,
});
