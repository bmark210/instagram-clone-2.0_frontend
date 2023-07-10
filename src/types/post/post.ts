import { User } from "../user/user";

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
  likes: string[];
  user: User;
  createdAt: string;
  updatedAt: string;
};

export type Posts = {
  items: OnePost[];
  status: string;
};
