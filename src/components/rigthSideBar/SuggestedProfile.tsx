import { useEffect, useState } from "react";
import { fetchUserById } from "../../api/endpoints/users";
import { OneUser } from "../../interfaces/user";
import {
  updateFollowersByUserId,
  updateFollowingsByUserId,
} from "../../api/serveses/follows/setFollowing";
import ProfileForm from "../common/forms/profileForm";
import CircleLoader from "../common/loaders/circleLoader/CircleLoader";

interface Props {
  userId: string;
}
const SuggestedProfile = ({ userId }: Props) => {
  const [followed, setFollowed] = useState(false);
  const [user, setUser] = useState<OneUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowUpdate = async () => {
    if (user) {
      setIsLoading(true);
      await updateFollowersByUserId(user?._id);
      await updateFollowingsByUserId(user?._id);
      setIsLoading(false);
      setFollowed(followed => !followed);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchUserById(userId);
      setUser(user.data);
    };
    fetchUser();
  }, [userId]);
  if (!user) return null;
  return (
    <div className="align-items flex w-full flex-row items-center justify-between">
      <ProfileForm user={user} />

      <button
        onClick={handleFollowUpdate}
        className={`${
          followed ? "bg-gray-medium" : "bg-blue-pure"
        } h-8 w-24 rounded-lg px-4 py-1 text-sm font-medium text-white`}
        type="button"
      >
        {isLoading ? <CircleLoader size="xs" color={"white"} /> : followed ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};
export default SuggestedProfile;
