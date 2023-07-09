import { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUserById } from "../../api/endpoints/users";
import defaultAvatar from "../../assets/avatars/default_avatar.jpg";

interface Props {
  userId: string;
}
const SuggestedProfile = ({ userId }: Props) => {
  const [followed, setFollowed] = useState(false);
  const [user, setUser] = useState({});

  function handleImageError(e: SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.target as HTMLImageElement;
    target.src = defaultAvatar;
  }
  console.log("userId", userId);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchUserById(userId);
      setUser(user.data);
    };
    fetchUser();
  }, [userId]);
  console.log("user", user);

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <Link to={`/${user?.username}/`}>
        <div className="flex items-center justify-between">
          <img
            className="rounded-full w-8 h-8 flex mr-3"
            src={
              user?.avatar?.downloadURL !== null
                ? `${user?.avatar?.downloadURL}`
                : defaultAvatar
            }
            alt={`${user?.username}'s avatar`}
            onError={handleImageError}
          />
          <div className="flex flex-col">
            <p className="font-bold text-xs">{user?.username}</p>
            <p className="text-xs text-gray-medium">Recommended by Instagram</p>
          </div>
        </div>
      </Link>
      <button className="text-xs font-medium text-blue-primary" type="button">
        Follow
      </button>
    </div>
  ) : null;
};
export default SuggestedProfile;
