import { User } from "../user";

type Comment = {
  comment: string;
  userId: string;
};

export type OnePost = {
  _id: string;
  image: {
    name: string;
    downloadURL: string;
    type: string;
  };
  text: string;
  place: string;
  comments: Comment[];
  likes: {
    userId: string;
  };
  user: User;
  createdAt: string;
  updatedAt: string;
};

export type Posts = {
  items: OnePost[];
  status: string;
};

export type fetchSuccessPostsAction = {
  type: "FETCH_POSTS_SUCCESS";
  payload: Posts;
};

export type AddPostAction = {
  type: "ADD_POST";
  payload: Posts;
};
