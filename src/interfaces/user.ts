interface avatar {
  downloadURL: string;
  name: string;
  type: string;
}

export interface OneUser {
  _id: string;
  username: string;
  fullName: string;
  avatar: avatar;
  postsLength: number;
  email: string;
  bio: string;
  following: string[];
  followers: string[];
}

export interface UserData {
  data: OneUser | null;
  status: string;
  error?: string;
}
