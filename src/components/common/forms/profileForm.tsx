import { Link } from "react-router-dom";
import defaultAvatar from "../../../assets/avatars/default_avatar.jpg";
import { OneUser } from "../../../interfaces/user";

type Props = {
  user: OneUser | null;
};

const ProfileForm = ({ user }: Props) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = defaultAvatar;
  };
  return (
    <Link to={`/${user?.username}/`}>
      <div className="flex items-center justify-between">
        <img
          className="mr-3 flex h-8 w-8 rounded-full object-cover"
          src={user?.avatar?.downloadURL || defaultAvatar}
          alt={`${user?.username}'s avatar`}
          onError={handleImageError}
        />
        <div className="flex flex-col">
          <p className="text-xs font-bold text-black-dark dark:text-white">{user?.username}</p>
          <p className="text-xs text-gray-400">Recommended by Instagram</p>
        </div>
      </div>
    </Link>
  );
};

export default ProfileForm;
