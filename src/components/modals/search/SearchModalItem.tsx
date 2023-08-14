import { Link } from "react-router-dom";
import { OneUser } from "../../../interfaces/user";
import defaultAvatar from "../../../assets/avatars/default_avatar.jpg";

type Props = {
  user: OneUser;
  handleHideSearchModal: () => void;
};

const SearchModalItem = ({ user, handleHideSearchModal }: Props) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = defaultAvatar;
  };
  return (
    <Link
      onClick={handleHideSearchModal}
      to={"/" + user.username}
      className="my-4 flex flex-row items-center gap-4"
    >
      <img
        className="h-11 w-11 rounded-full object-cover"
        src={user.avatar?.downloadURL || defaultAvatar}
        alt={`${user.username}'s avatar`}
        onError={handleImageError}
      />
      <div>
        <h2 className="font-medium">{user.username}</h2>
        <p className="text-sm font-thin text-gray-500">{user.fullName}</p>
      </div>
    </Link>
  );
};

export default SearchModalItem;
