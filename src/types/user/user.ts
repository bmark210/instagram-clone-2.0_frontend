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
  email: string;
  bio: string;
  following: string[];
  followers: string[];
};

export type User = {
  data: OneUser | null;
  status: string;
};
