import { useEffect, useState } from "react";
import { fetchUserById } from "../../api/endpoints/users";
import { OneUser } from "../../interfaces/user";
import {
  updateFollowersByUserId,
  updateFollowingsByUserId,
} from "../../api/serveses/follows/setFollowing";
import { useAppDispach } from "../../redux/hooks";
import { fetchPosts } from "../../redux/slices/posts";
import ProfileForm from "../common/forms/profileForm";

interface Props {
  userId: string;
}
const SuggestedProfileDisappear = ({ userId }: Props) => {
  const dispatch = useAppDispach();

  const [followed, setFollowed] = useState(false);
  const [user, setUser] = useState<OneUser | null>(null);

  const handleFollowUpdate = async () => {
    setFollowed(followed => !followed);
    if (user) {
      await updateFollowersByUserId(user?._id);
      await updateFollowingsByUserId(user?._id);
    }
    dispatch(fetchPosts());
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchUserById(userId);
      setUser(user.data);
    };
    fetchUser();
  }, [userId]);
  if (!user) return null;
  return !followed ? (
    <div className="align-items flex flex-row items-center justify-between">
      <ProfileForm user={user} />
      {followed ? (
        <button
          onClick={handleFollowUpdate}
          className="text-xs font-medium text-blue-pure"
          type="button"
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={handleFollowUpdate}
          className="text-xs font-medium text-blue-pure"
          type="button"
        >
          Follow
        </button>
      )}
    </div>
  ) : null;
};
export default SuggestedProfileDisappear;
