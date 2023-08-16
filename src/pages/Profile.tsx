import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import PublicationIcon from "../components/common/icons/Publication/PublicationIcon";
import SettingsIcon from "../components/common/icons/Settings/SettingsIcon";
import PublicationActiveIcon from "../components/common/icons/Publication/PublicationActiveIcon";
import SavedActiveIcon from "../components/common/icons/Saved/SavedActiveIcon";
import SavedIcon from "../components/common/icons/Saved/SavedIcon";
import TaggedActiveIcon from "../components/common/icons/Tagged/TaggedActiveIcon";
import TaggedIcon from "../components/common/icons/Tagged/TaggedIcon";
import { fetchUserByUsername } from "../api/endpoints/users";
import { OneUser, UserData } from "../interfaces/user";
import { RootState } from "../redux/store";
import defaultAvatar from "../assets/avatars/default_avatar.jpg";
import {
  updateFollowersByUserId,
  updateFollowingsByUserId,
} from "../api/serveses/follows/setFollowing";
import ContentLoader from "react-content-loader";
import { useAppDispach, useAppSelector } from "../redux/hooks";
import { openModal } from "../redux/slices/modal";
import Footer from "../components/publications/Footer";
import { EDIT_PROFILE, NOT_FOUND } from "../constants/routes";

const Profile = () => {
  const [user, setUser] = useState<null | OneUser>(null);
  const [followersLength, setFollowersLength] = useState<number>();
  const [isFollowing, setIsFollowing] = useState(false);

  const currentUser: UserData = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const { username } = useParams<{ username: string }>();

  const dispatch = useAppDispach();
  const handleOpenModal = (modalName: string) => {
    dispatch(openModal(modalName));
  };

  function handleImageClick() {
    if (isCurrentUser) {
      handleOpenModal("avatarModal");
    }
  }

  useEffect(() => {
    const setUserHandler = (user: OneUser, countFolowers: number) => {
      setUser(user);
      setFollowersLength(countFolowers);
      if (user.followers.includes(currentUser.data?._id as string)) {
        setIsFollowing(true);
      }
    };
    if (currentUser.data && username) {
      if (username !== currentUser.data.username) {
        fetchUserByUsername(username)
          .then(res => {
            if (res.data === null) {
              navigate(NOT_FOUND, { replace: true });
            } else {
              setUserHandler(res.data, res.data?.followers ? res.data?.followers.length : 0);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        setUserHandler(currentUser.data, currentUser.data?.followers.length);
      }
    }
  }, [username, currentUser, navigate]);

  const isCurrentUser = currentUser && username === currentUser.data?.username;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = defaultAvatar;
  };

  const setFollow = async () => {
    if (user && currentUser) {
      await updateFollowersByUserId(user?._id);
      await updateFollowingsByUserId(user?._id);
      setIsFollowing(isFollowing => !isFollowing);
      setFollowersLength(prev => (isFollowing ? prev! - 1 : prev! + 1));
    }
  };

  if (user === null || user?.followers === undefined) {
    return (
      <div className="w-full">
        <div className="mx-auto mt-10 flex w-3/4 min-w-max flex-row border-b border-gray-primary px-10 pb-3">
          <ContentLoader viewBox="0 0 900 180" height={180} width={900} speed={2}>
            <circle cx="125" cy="80" r="75" />
            <rect x="270" y="10" rx="3" ry="3" width="125.5" height="17" />
            <rect x="270" y="45" rx="3" ry="3" width="296" height="17" />
            <rect x="270" y="80" rx="3" ry="3" width="253.5" height="17" />
            <rect x="270" y="120" rx="3" ry="3" width="212.5" height="17" />
          </ContentLoader>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full overflow-y-auto overflow-x-hidden">
        <div className="mx-auto mt-10 flex w-3/4 min-w-max flex-row border-b border-gray-primary px-20 pb-10 pl-28">
          <img
            className={`${
              isCurrentUser && "cursor-pointer"
            } mr-20 h-36 w-36 rounded-full object-cover`}
            src={user.avatar?.downloadURL || defaultAvatar}
            alt="avatar"
            onError={handleImageError}
            onClick={handleImageClick}
          />
          <div className="flex flex-col">
            <div className="mb-5 flex flex-row items-center">
              <p className="mr-6 text-xl font-normal">{user?.username}</p>
              {isCurrentUser ? (
                <>
                  <NavLink
                    to={EDIT_PROFILE}
                    className="font-xl mr-5 rounded-lg bg-gray-200 px-4 py-1 hover:bg-gray-primary"
                  >
                    Edit profile
                  </NavLink>
                  <button className="cursor-no-drop">
                    <SettingsIcon />
                  </button>
                </>
              ) : (
                <div className="flex flex-row gap-2">
                  {isFollowing ? (
                    <button
                      onClick={setFollow}
                      className="rounded-lg bg-gray-200 px-5 py-1 font-medium text-black-dark"
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      onClick={setFollow}
                      className="rounded-lg bg-blue-primary px-5 py-1 font-medium text-white"
                    >
                      Follow
                    </button>
                  )}
                  <button className="cursor-no-drop rounded-lg bg-gray-200 px-5 py-1 font-medium text-black-dark">
                    Message
                  </button>
                </div>
              )}
            </div>
            <div className="mb-4 flex w-3/4 flex-row items-center gap-6">
              <div className="flex flex-row">
                <span className="mr-1 font-medium">{user.postsLength}</span>
                <p className="text-base font-normal ">{user.postsLength > 1 ? "posts" : "post"}</p>
              </div>
              <div className="flex flex-row">
                <span className="mr-1 font-medium">{followersLength}</span>
                <p className="text-base font-normal">
                  {followersLength === 1 ? "follower" : "followers"}
                </p>
              </div>
              <div className="flex flex-row">
                <span className="mr-1 font-medium">{user?.following.length}</span>
                <p className="text-base font-normal">following</p>
              </div>
            </div>
            <div>
              <p className="text-base font-medium">{user?.fullName}</p>
            </div>
            <div>{user?.bio && <p className="w-96 text-sm">{user?.bio}</p>}</div>
          </div>
        </div>
        <div className="mx-auto mb-5 flex w-1/3 flex-row items-center justify-center">
          <NavLink
            to={`/${user?.username}/`}
            className={({ isActive }) =>
              `${
                isActive ? "border-t border-black-dark pt-1" : ""
              } mx-5 flex flex-row items-center pt-5`
            }
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                {isActive ? <PublicationActiveIcon /> : <PublicationIcon />}
                <p
                  className={`${
                    isActive ? "text-black-dark" : ""
                  }text-gray-500 ml-2 text-xs font-medium`}
                >
                  POSTS
                </p>
              </>
            )}
          </NavLink>
          {isCurrentUser && (
            <NavLink
              to={`/${user?.username}/saved/`}
              className={({ isActive }) =>
                `${
                  isActive ? "border-t border-black-dark" : ""
                } mx-5 flex flex-row items-center pt-5`
              }
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  {isActive ? <SavedActiveIcon /> : <SavedIcon />}
                  <p
                    className={`${
                      isActive ? "text-black-dark" : ""
                    }text-gray-500 ml-2 text-xs font-medium`}
                  >
                    SAVED
                  </p>
                </>
              )}
            </NavLink>
          )}
          <NavLink
            to={`/${user?.username}/tagged/`}
            className={({ isActive }) =>
              `${isActive ? "border-t border-black-dark" : ""} mx-5 flex flex-row items-center pt-5`
            }
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                {isActive ? <TaggedActiveIcon /> : <TaggedIcon />}
                <p
                  className={`${
                    isActive ? "text-black-dark" : ""
                  }text-gray-500 ml-2 text-xs font-medium`}
                >
                  TAGGED
                </p>
              </>
            )}
          </NavLink>
        </div>
        <div className="mx-auto w-3/4">
          <Outlet />
        </div>
      </div>
      <div className="my-10">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
