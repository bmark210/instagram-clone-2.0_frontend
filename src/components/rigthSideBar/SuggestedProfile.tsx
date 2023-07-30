import { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUserById } from "../../api/endpoints/users";
import defaultAvatar from "../../assets/avatars/default_avatar.jpg";
import { OneUser } from "../../interfaces/user";
import {
  updateFollowersByUserId,
  updateFollowingsByUserId,
} from "../../api/serveses/follows/setFollowing";
import { useAppDispach } from "../../redux/hooks";
import { fetchPosts } from "../../redux/slices/posts";

interface Props {
  userId: string;
}
const SuggestedProfile = ({ userId }: Props) => {
  const dispatch = useAppDispach();

  const [followed, setFollowed] = useState(false);
  const [user, setUser] = useState<OneUser | null>(null);

  const handleFollow = async () => {
    setFollowed(followed => !followed);
    if (user) {
      await updateFollowersByUserId(user?._id);
      await updateFollowingsByUserId(user?._id);
    }
    dispatch(fetchPosts());
  };

  function handleImageError(e: SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.target as HTMLImageElement;
    target.src = defaultAvatar;
  }
  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchUserById(userId);
      setUser(user.data);
    };
    fetchUser();
  }, [userId]);
  return !followed ? (
    <div className="align-items flex flex-row items-center justify-between">
      <Link to={`/${user?.username}/`}>
        <div className="flex items-center justify-between">
          <img
            className="mr-3 flex h-8 w-8 rounded-full object-cover"
            src={user?.avatar?.downloadURL || defaultAvatar}
            alt={`${user?.username}'s avatar`}
            onError={handleImageError}
          />
          <div className="flex flex-col">
            <p className="text-xs font-bold">{user?.username}</p>
            <p className="text-xs text-gray-medium">Recommended by Instagram</p>
          </div>
        </div>
      </Link>
      <button
        onClick={handleFollow}
        className="text-xs font-medium text-blue-primary"
        type="button"
      >
        Follow
      </button>
    </div>
  ) : null;
};
export default SuggestedProfile;
