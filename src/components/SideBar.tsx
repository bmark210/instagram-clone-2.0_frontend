import HomeIcon from "./common/icons/Home/HomeIcon";
import CreateIcon from "./common/icons/Create/CreateIcon";
import { NavLink } from "react-router-dom";
import InstagramLogoIcon from "./common/icons/Instagram/InstagramLogoIcon";
import MoreIcon from "./common/icons/More/MoreIcon";
import SearchIcon from "./common/icons/Search/SearchIcon";
import SearchActivIcon from "./common/icons/Search/SearchActivIcon";
import defaultAvatar from "../assets/avatars/default_avatar.jpg";
import { useState } from "react";
import Modal from "./common/modals/Modal";
import Create from "./modals/createPost/CreatePost";
import HomeIconActive from "./common/icons/Home/HomeIconActive";
import MoreActiveIcon from "./common/icons/More/MoreActiveIcon";
import CreateActivIcon from "./common/icons/Create/CreateActivIcon";
import ExploreActiveIcon from "./common/icons/Explore/ExploreActiveIcon";
import ExploreIcon from "./common/icons/Explore/ExploreIcon";
import MoreModal from "./modals/more/MoreModal";
import { useAppDispach, useAppSelector } from "../redux/hooks";
import { openModal } from "../redux/slices/modal";
import BlackInstagramLogo from "./common/icons/Instagram/BlackInstagramLogo";
import SearchModal from "./modals/search/SearchModal";
import CreateAvatar from "./modals/createAvatar/CreateAvatar";
import { RootState } from "../redux/store";

const SideBar = () => {
  const isCreateModalOpen = useAppSelector(state => state.modals.createModal);
  const dispatch = useAppDispach();

  const avatarModalIsOpen = useAppSelector((state: RootState) => state.modals.avatarModal);

  const handleOpenModal = (modalName: string) => {
    dispatch(openModal(modalName));
  };

  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<null | boolean>(null);

  function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.target as HTMLImageElement;
    target.src = defaultAvatar;
  }

  const currentUsername = useAppSelector(state => state.auth.data?.username);
  const currentUserAvatarUrl = useAppSelector(state => state.auth.data?.avatar?.downloadURL);

  return (
    <>
      <div className="z-40 flex h-screen min-h-screen w-64 flex-col">
        <aside
          className={`${
            isSearchModalOpen ? "w-18 animate-changeWidthIn" : "w-64"
          } fixed left-0 top-0 z-40 flex h-screen flex-col border-r  border-gray-primary bg-white px-2`}
        >
          <NavLink
            onClick={() => setIsSearchModalOpen(false)}
            to="/feed"
            className={`${
              isSearchModalOpen ? "p-3 transition-opacity duration-300" : "p-2"
            }  mb-8 mt-6 h-10`}
          >
            {isSearchModalOpen ? <BlackInstagramLogo /> : <InstagramLogoIcon />}
          </NavLink>
          <div className="mb-32 grid grid-rows-6 gap-2">
            <NavLink
              onClick={() => setIsSearchModalOpen(false)}
              className="group flex flex-row items-center rounded-lg p-3 hover:bg-gray-100 active:opacity-75"
              to="/feed"
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <div className="transform transition duration-300 ease-in-out group-hover:scale-110">
                    {isActive ? <HomeIconActive /> : <HomeIcon />}
                  </div>
                  {!isSearchModalOpen && (
                    <h2 className={`${isActive ? "font-bold" : ""} mx-4`}>Home</h2>
                  )}
                </>
              )}
            </NavLink>
            <div
              role="button"
              className={`group flex flex-row items-center ${
                isSearchModalOpen ? "border" : ""
              } rounded-lg p-3 transition-opacity duration-300 hover:bg-gray-100 active:opacity-75`}
              onClick={() => setIsSearchModalOpen(!isSearchModalOpen)}
            >
              <>
                <div className="relative transform transition duration-300 ease-in-out group-hover:scale-110">
                  {isSearchModalOpen ? <SearchActivIcon /> : <SearchIcon />}
                </div>
                {!isSearchModalOpen && (
                  <h2 className={`${isSearchModalOpen ? "font-bold" : ""} mx-4`}>Search</h2>
                )}
              </>
            </div>
            <NavLink
              onClick={() => setIsSearchModalOpen(false)}
              className="group flex flex-row items-center rounded-lg p-3 hover:bg-gray-100 active:opacity-75"
              to="/explore"
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <div className="transform transition duration-300 ease-in-out group-hover:scale-110">
                    {isActive ? <ExploreActiveIcon /> : <ExploreIcon />}
                  </div>
                  {!isSearchModalOpen && (
                    <h2 className={`${isActive ? "font-bold" : ""} mx-4`}>Explore</h2>
                  )}
                </>
              )}
            </NavLink>
            <div
              role="button"
              onClick={() => handleOpenModal("createModal")}
              className="group flex flex-row items-center rounded-lg p-3 transition-opacity duration-300 hover:bg-gray-100 active:opacity-75"
            >
              <>
                <div className="transform transition duration-300 ease-in-out group-hover:scale-110">
                  {isCreateModalOpen ? <CreateActivIcon /> : <CreateIcon />}
                </div>
                {!isSearchModalOpen && (
                  <h2 className={`${isCreateModalOpen ? "font-bold" : ""} mx-4`}>Create</h2>
                )}
              </>
            </div>
            <NavLink
              onClick={() => setIsSearchModalOpen(false)}
              className="group flex flex-row items-center rounded-lg p-3 transition-opacity duration-300 hover:bg-gray-100 active:opacity-75"
              to={`/${currentUsername}/`}
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <div className="transform transition duration-300 ease-in-out group-hover:scale-110">
                    {
                      <img
                        className={`h-7 w-7 rounded-full object-cover ${
                          isActive ? "border-2 border-black-dark" : ""
                        }`}
                        src={currentUserAvatarUrl ? currentUserAvatarUrl : defaultAvatar}
                        onError={handleImageError}
                        alt="avatar"
                      />
                    }
                  </div>
                  {!isSearchModalOpen && (
                    <h2 className={`${isActive ? "font-bold" : ""} mx-4`}>Profile</h2>
                  )}
                </>
              )}
            </NavLink>
          </div>
          <div
            role="button"
            className={`${isSearchModalOpen ? "w-18" : "w-[235px]"} absolute bottom-0 my-3 `}
          >
            <div
              className="group flex flex-row items-center rounded-lg p-3 transition-opacity duration-300 hover:bg-gray-100 active:opacity-75"
              onClick={() => setIsMoreModalOpen(true)}
            >
              <>
                <div className="relative transform transition duration-300 ease-in-out group-hover:scale-110">
                  {isMoreModalOpen ? <MoreActiveIcon /> : <MoreIcon />}
                </div>
                {!isSearchModalOpen && (
                  <h2 className={`${isMoreModalOpen ? "font-bold" : ""} mx-4`}>More</h2>
                )}
              </>
            </div>
          </div>
        </aside>
      </div>
      {isCreateModalOpen && (
        <Modal isOpen={isCreateModalOpen}>
          <Create />
        </Modal>
      )}
      {isMoreModalOpen && (
        <MoreModal username={currentUsername} setIsMoreModalOpen={setIsMoreModalOpen} />
      )}
      {isSearchModalOpen && (
        <SearchModal
          isSearchModalOpen={isSearchModalOpen}
          setIsSearchModalOpen={setIsSearchModalOpen}
        />
      )}
      {avatarModalIsOpen && (
        <Modal isOpen={avatarModalIsOpen}>
          <CreateAvatar />
        </Modal>
      )}
    </>
  );
};

export default SideBar;
