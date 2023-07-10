import { SyntheticEvent } from "react";
import defaultAvatar from "../../assets/avatars/default_avatar.jpg";
import { Link } from "react-router-dom";
import ContentLoader from "react-content-loader";
import { User } from "../../types/user/user";

interface Props {
  user: User;
}

const UserForm = ({ user }: Props) => {
  function handleImageError(e: SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.target as HTMLImageElement;
    target.src = defaultAvatar;
  }
  console.log(user, "user");
  
  const usersIsLoading = user.status === "loading";

  if (usersIsLoading) {
    return (
      <ContentLoader className="w-80 h-14 flex mr-3">
        <circle cx="30" cy="28" r="28" />
        <rect x="80" y="3" rx="3" ry="3" width="70" height="10" />
        <rect x="80" y="25" rx="3" ry="3" width="140" height="10" />
        <rect x="80" y="45" rx="3" ry="3" width="50" height="10" />
      </ContentLoader>
    );
  }

  return (
    <Link
      to={`/${user.data?.username}/`}
      className="flex flex-row items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-14 h-14 object-cover"
          onError={handleImageError}
          src={
            user.data?.avatar?.downloadURL
              ? user.data?.avatar?.downloadURL
              : defaultAvatar
          }
          alt="avatar"
        />
      </div>
      <div className="ml-4 col-span-2">
        <p className="font-bold text-sm">{user.data?.username}</p>
        <p className="text-sm text-gray-500">{user.data?.fullName}</p>
      </div>
    </Link>
  );
};

export default UserForm;
