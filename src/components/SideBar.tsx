import HomeIcon from "./common/icons/Home/HomeIcon";
import CreateIcon from "./common/icons/HomeIcon copy";
import { NavLink } from "react-router-dom";
import InstagramLogoIcon from "./common/icons/InstagramLogoIcon";
import MoreIcon from "./common/icons/More/MoreIcon";
import SearchIcon from "./common/icons/Search/SearchIcon";
import SearchActivIcon from "./common/icons/Search/SearchActivIcon";
import defaultAvatar from "../assets/avatars/default_avatar.jpg";
import { useState } from "react";
import Modal from "../components/Modal";
import Create from "../pages/Create";
import HomeIconActive from "./common/icons/Home/HomeIconActive";
import MoreActiveIcon from "./common/icons/More/MoreActiveIcon";
import CreateActivIcon from "./common/icons/Create/CreateActivIcon";
import ExploreActiveIcon from "./common/icons/Explore/ExploreActiveIcon";
import ExploreIcon from "./common/icons/Explore/ExploreIcon";
import { useSelector } from "react-redux";
import MoreModal from "./modals/MoreModal";
import { RootState } from "../redux/store";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);

  function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.target as HTMLImageElement;
    target.src = defaultAvatar;
  }

  const currentUsername = useSelector(
    (state: RootState) => state.auth.data?.username
  );
  const currentUserAvatarUrl = useSelector(
    (state: RootState) => state.auth.data?.avatar?.downloadURL
  );

  return (
    <>
      <div className="flex flex-col w-64 h-screen min-h-screen">
        <aside className="w-64 fixed h-screen flex flex-col px-2 top-0 left-0 border-r border-gray-primary bg-white">
          <NavLink to="/feed" className="my-10 ml-2">
            <InstagramLogoIcon />
          </NavLink>
          <div className="grid grid-rows-6 gap-4 mb-32">
            <NavLink
              className="group flex flex-row items-center hover:bg-gray-100 active:opacity-75 rounded-lg p-3"
              to="/feed"
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <div className="transition duration-300 ease-in-out transform group-hover:scale-110">
                    {isActive ? <HomeIconActive /> : <HomeIcon />}
                  </div>
                  <h2 className={`${isActive ? "font-bold" : ""} mx-4`}>
                    Home
                  </h2>
                </>
              )}
            </NavLink>
            <NavLink
              className="group flex flex-row items-center hover:bg-gray-100 active:opacity-75 rounded-lg transition-opacity duration-300 p-3"
              to="/search"
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <div className="transition duration-300 ease-in-out transform group-hover:scale-110">
                    {isActive ? <SearchActivIcon /> : <SearchIcon />}
                  </div>
                  <h2 className={`${isActive ? "font-bold" : ""} mx-4`}>
                    Search
                  </h2>
                </>
              )}
            </NavLink>
            <NavLink
              className="group flex flex-row items-center hover:bg-gray-100 active:opacity-75 rounded-lg p-3"
              to="/explore"
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <div className="transition duration-300 ease-in-out transform group-hover:scale-110">
                    {isActive ? <ExploreActiveIcon /> : <ExploreIcon />}
                  </div>
                  <h2 className={`${isActive ? "font-bold" : ""} mx-4`}>
                    Explore
                  </h2>
                </>
              )}
            </NavLink>
            <div
              role="button"
              onClick={() => setIsOpen(true)}
              className="group flex flex-row items-center hover:bg-gray-100 active:opacity-75 rounded-lg transition-opacity duration-300 p-3"
            >
              <>
                <div className="transition duration-300 ease-in-out transform group-hover:scale-110">
                  {isOpen ? <CreateActivIcon /> : <CreateIcon />}
                </div>
                <h2 className={`${isOpen ? "font-bold" : ""} mx-4`}>Create</h2>
              </>
            </div>
            <NavLink
              className="group flex flex-row items-center hover:bg-gray-100 active:opacity-75 rounded-lg transition-opacity duration-300 p-3"
              to={`/${currentUsername}/`}
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <div className="transition duration-300 ease-in-out transform group-hover:scale-110">
                    {
                      <img
                        className={`w-7 h-7 rounded-full object-cover ${
                          isActive ? "border-black-dark border-2" : ""
                        }`}
                        src={
                          currentUserAvatarUrl
                            ? currentUserAvatarUrl
                            : defaultAvatar
                        }
                        onError={handleImageError}
                        alt="avatar"
                      />
                    }
                  </div>
                  <h2 className={`${isActive ? "font-bold" : ""} mx-4`}>
                    Profile
                  </h2>
                </>
              )}
            </NavLink>
          </div>
          <div
            role="button"
            className="group flex flex-row items-center hover:bg-gray-100 active:opacity-75 rounded-lg transition-opacity duration-300 p-3"
            onClick={() => setIsMoreModalOpen(!isMoreModalOpen)}
          >
            <>
              <div className="relative transition duration-300 ease-in-out transform group-hover:scale-110">
                {isMoreModalOpen ? <MoreActiveIcon /> : <MoreIcon />}
              </div>
              <h2 className={`${isMoreModalOpen ? "font-bold" : ""} mx-4`}>
                More
              </h2>
            </>
          </div>
        </aside>
      </div>
      <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
        <Create isOpen={isOpen} setIsOpen={setIsOpen} />
      </Modal>
      {isMoreModalOpen && (
        <MoreModal
          username={currentUsername}
          setIsMoreModalOpen={setIsMoreModalOpen}
        />
      )}
    </>
  );
};

export default SideBar;
