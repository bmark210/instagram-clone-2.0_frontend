import { OneUser } from "./user";

export interface Comment {
  comment: string;
  user: OneUser;
}

export interface OnePost {
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
}

export interface Posts {
  items: OnePost[];
  status: string;
}
