import { OneUser } from "../user/user";

export type Comment = {
  _id: string;
  comment: string;
  user: OneUser;
};

export type OnePost = {
  _id: string;
  image: {
    name: string;
    downloadURL: string;
    type: string;
  };
  caption: string;
  place: string;
  comments: Comment[];
  commentsLength: number;
  likes: string[];
  user: OneUser;
  createdAt: string;
  updatedAt: string;
};

export type Posts = {
  items: OnePost[];
  status: string;
};
