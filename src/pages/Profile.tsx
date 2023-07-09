import { NavLink, Route, Routes, useParams } from "react-router-dom";
import PublicationIcon from "../components/common/icons/Publication/PublicationIcon";
import SettingsIcon from "../components/common/icons/Settings/SettingsIcon";
import PublicationActiveIcon from "../components/common/icons/Publication/PublicationActiveIcon";
import SavedActiveIcon from "../components/common/icons/Saved/SavedActiveIcon";
import SavedIcon from "../components/common/icons/Saved/SavedIcon";
import TaggedActiveIcon from "../components/common/icons/Tagged/TaggedActiveIcon";
import TaggedIcon from "../components/common/icons/Tagged/TaggedIcon";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserByUsername } from "../api/endpoints/users";
import { OneUser, User } from "../types/user";
import { RootState } from "../redux/store";
import defaultAvatar from "../assets/avatars/default_avatar.jpg";
import { fetchPostsByUserId } from "../api/endpoints/posts";
import Publications from "../components/Publications";
import Saved from "../components/Saved";
import Tagged from "../components/Tagged";
import Modal from "../components/Modal";
import CreateAvatar from "../components/CreateAvatar";
import {
  updateFollowersByUserId,
  updateFollowingsByUserId,
} from "../api/serveses/follows/setFollowing";
import ContentLoader from "react-content-loader";

const Profile = () => {
  const currentUser: User | null = useSelector(
    (state: RootState) => state.auth
  );
  const [isOpenCreateAvatarModal, setIsOpenCreateAvatarModal] = useState(false);
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<null | OneUser>(null);
  const [posts, setPosts] = useState(null);

  const [followersLength, setFollowersLength] = useState<number | undefined>();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (currentUser?.data && username) {
      if (username !== currentUser.data.username) {
        fetchUserByUsername(username).then((res) => {
          setUser(res.data);
        });
      } else {
        setUser(currentUser.data);
      }
    }
  }, [username, currentUser]);

  const isCurrentUser = currentUser && username === currentUser.data?.username;

  useEffect(() => {
    const fetchData = async () => {
      setFollowersLength(user?.followers.length);
      try {
        if (user) {
          const data = await fetchPostsByUserId(user._id);
          setPosts(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user]);

  function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.target as HTMLImageElement;
    target.src = defaultAvatar;
  }

  function handleImageClick() {
    if (isCurrentUser) {
      setIsOpenCreateAvatarModal(true);
    }
  }

  const setFollow = async () => {
    setIsFollowing((isFollowing) => !isFollowing);
    if (user && currentUser) {
      await updateFollowersByUserId(user?._id);
      await updateFollowingsByUserId(user?._id);
      setFollowersLength((prev) => (isFollowing ? prev! - 1 : prev! + 1));
    }
  };

  useEffect(() => {
    if (user?.followers.includes(currentUser.data?._id as string)) {
      setIsFollowing(true);
    }
  }, [user, currentUser]);
  if (user === null || user?.followers === undefined) {
    return (
      <div className="flex min-w-max flex-row w-3/4 mx-auto pb-10 mt-10 px-20 border-b border-gray-primary">
        <ContentLoader viewBox="0 0 900 180" height={180} width={900} speed={2}>
          <circle cx="160" cy="80" r="75" />
          <rect x="320" y="10" rx="3" ry="3" width="125.5" height="17" />
          <rect x="320" y="45" rx="3" ry="3" width="296" height="17" />
          <rect x="320" y="80" rx="3" ry="3" width="253.5" height="17" />
          <rect x="320" y="120" rx="3" ry="3" width="212.5" height="17" />
        </ContentLoader>
      </div>
    );
  }
  console.log(followersLength);

  return (
    <div className="w-full">
      <div className="flex min-w-max flex-row w-3/4 mx-auto pb-10 mt-10 px-20 border-b border-gray-primary">
        <img
          className={`${
            isCurrentUser && "cursor-pointer"
          } rounded-full w-36 h-36 mr-20 object-cover`}
          src={
            user?.avatar?.downloadURL
              ? user?.avatar?.downloadURL
              : defaultAvatar
          }
          alt="avatar"
          onError={handleImageError}
          onClick={handleImageClick}
        />
        <div className="flex flex-col">
          <div className="flex flex-row items-center mb-5">
            <p className="text-xl font-normal mr-6">{user?.username}</p>
            {isCurrentUser ? (
              <>
                <NavLink
                  to={"/settings/edit"}
                  className="font-xl mr-5 hover:bg-gray-primary bg-gray-200 px-4 py-1 rounded-lg"
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
                    className="px-5 py-1 rounded-lg bg-gray-200 font-medium text-black-dark"
                  >
                    Following
                  </button>
                ) : (
                  <button
                    onClick={setFollow}
                    className="px-5 py-1 rounded-lg bg-blue-primary font-medium text-white"
                  >
                    Follow
                  </button>
                )}
                <button className="px-5 py-1 rounded-lg bg-gray-200 font-medium cursor-no-drop text-black-dark">
                  Message
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-row w-3/4 items-center mb-4 gap-6">
            <div className="flex flex-row">
              <span className="font-medium mr-1">324</span>
              <p className="text-base font-normal ">posts</p>
            </div>
            <div className="flex flex-row">
              <span className="font-medium mr-1">{followersLength}</span>
              <p className="text-base font-normal">followers</p>
            </div>
            <div className="flex flex-row">
              <span className="font-medium mr-1">{user?.following.length}</span>
              <p className="text-base font-normal">following</p>
            </div>
          </div>
          <div>
            <p className="text-base font-medium">{user?.fullName}</p>
          </div>
          <div>{user?.bio && <p className="text-sm w-96">{user?.bio}</p>}</div>
        </div>
      </div>
      <div className="w-1/3 mx-auto mb-5 flex flex-row items-center justify-center">
        <NavLink
          to={`/${user?.username}/`}
          className={({ isActive }) =>
            `${
              isActive ? "border-t border-black-dark pt-1" : ""
            } flex flex-row items-center pt-5 mx-5`
          }
        >
          {({ isActive }: { isActive: boolean }) => (
            <>
              {isActive ? <PublicationActiveIcon /> : <PublicationIcon />}
              <p
                className={`${
                  isActive ? "text-black-dark" : ""
                }text-gray-500 text-xs font-medium ml-2`}
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
              } flex flex-row items-center pt-5 mx-5`
            }
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                {isActive ? <SavedActiveIcon /> : <SavedIcon />}
                <p
                  className={`${
                    isActive ? "text-black-dark" : ""
                  }text-gray-500 text-xs font-medium ml-2`}
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
            `${
              isActive ? "border-t border-black-dark" : ""
            } flex flex-row items-center pt-5 mx-5`
          }
        >
          {({ isActive }: { isActive: boolean }) => (
            <>
              {isActive ? <TaggedActiveIcon /> : <TaggedIcon />}
              <p
                className={`${
                  isActive ? "text-black-dark" : ""
                }text-gray-500 text-xs font-medium ml-2`}
              >
                TAGGED
              </p>
            </>
          )}
        </NavLink>
      </div>
      <div className="w-3/4 mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              <Publications posts={posts} isCurrentUser={isCurrentUser} />
            }
          />
          <Route path="/saved" element={<Saved />} />
          <Route path="/tagged" element={<Tagged />} />
        </Routes>
      </div>
      <Modal
        isOpen={isOpenCreateAvatarModal}
        setIsOpen={setIsOpenCreateAvatarModal}
      >
        <CreateAvatar />
      </Modal>
    </div>
  );
};

export default Profile;
