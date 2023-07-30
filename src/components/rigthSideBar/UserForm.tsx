import { SyntheticEvent } from "react";
import defaultAvatar from "../../assets/avatars/default_avatar.jpg";
import { Link } from "react-router-dom";
import ContentLoader from "react-content-loader";
import { UserData } from "../../interfaces/user";

interface Props {
  user: UserData;
}

const UserForm = ({ user }: Props) => {
  function handleImageError(e: SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.target as HTMLImageElement;
    target.src = defaultAvatar;
  }
  const usersIsLoading = user.status === "loading";

  if (usersIsLoading) {
    return (
      <ContentLoader className="mr-3 flex h-14 w-80">
        <circle cx="30" cy="28" r="28" />
        <rect x="80" y="3" rx="3" ry="3" width="70" height="10" />
        <rect x="80" y="25" rx="3" ry="3" width="140" height="10" />
        <rect x="80" y="45" rx="3" ry="3" width="50" height="10" />
      </ContentLoader>
    );
  }

  return (
    <Link to={`/${user.data?.username}/`} className="flex flex-row items-center">
      <div className="col-span-1 flex items-center justify-between">
        <img
          className="h-14 w-14 rounded-full object-cover"
          onError={handleImageError}
          src={user.data?.avatar?.downloadURL || defaultAvatar}
          alt="avatar"
        />
      </div>
      <div className="col-span-2 ml-4">
        <p className="text-sm font-bold">{user.data?.username}</p>
        <p className="text-sm text-gray-500">{user.data?.fullName}</p>
      </div>
    </Link>
  );
};

export default UserForm;
