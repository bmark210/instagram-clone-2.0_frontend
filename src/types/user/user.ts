type avatar = {
  downloadURL: string;
  name: string;
  type: string;
};

export type OneUser = {
  _id: string;
  username: string;
  fullName: string;
  avatar: avatar;
  postsLength: number;
  email: string;
  bio: string;
  following: string[];
  followers: string[];
};

export type UserData = {
  data: OneUser | null;
  status: string;
  error?: string;
};
