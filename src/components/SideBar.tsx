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
import SearchModal from "./search/SearchForm";
import CreateAvatar from "./modals/createAvatar/CreateAvatar";
import { RootState } from "../redux/store";
import { closeModal } from "../redux/slices/modal";
import * as ROUTES from "../constants/routes";

const SideBar = () => {
  const isCreateModalOpen = useAppSelector(state => state.modals.createModal);
  const dispatch = useAppDispach();
  const avatarModalIsOpen = useAppSelector((state: RootState) => state.modals.avatarModal);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const currentUsername = useAppSelector(state => state.auth.data?.username);
  const currentUserAvatarUrl = useAppSelector(state => state.auth.data?.avatar?.downloadURL);
  const [controlConcilation, setControlConcilation] = useState(true); // it check if user uploaded image

  const handleOpenModal = (modalName: string) => {
    dispatch(openModal(modalName));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = defaultAvatar;
  };

  const handleConcilation = () => {
    if (controlConcilation) dispatch(closeModal("createModal"));
    else if (window.confirm("are you sure?")) dispatch(closeModal("createModal"));
  };

  return (
    <>
      <div className={`${isSearchModalOpen ? "w-16" : "w-72"}`}>
        <aside
          className={`${
            isSearchModalOpen ? "w-16 animate-changeWidthIn" : "w-64 border-r"
          } max-w-64 min-w-18 fixed left-0 top-0 z-40 flex h-screen flex-col border-gray-primary bg-white px-2 dark:border-zinc-600 dark:bg-black-dark`}
        >
          <NavLink
            onClick={() => setIsSearchModalOpen(false)}
            to={ROUTES.FEED}
            className={`${
              isSearchModalOpen ? "p-3 transition-opacity duration-300" : "p-2"
            }  mb-8 mt-6 h-10`}
          >
            {isSearchModalOpen ? <BlackInstagramLogo /> : <InstagramLogoIcon />}
          </NavLink>
          <div className="mb-32 grid grid-rows-6 gap-2">
            <NavLink
              onClick={() => setIsSearchModalOpen(false)}
              className="group flex flex-row items-center rounded-lg p-3 hover:bg-gray-100 active:opacity-75 dark:hover:bg-black-light"
              to={ROUTES.FEED}
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <div className="transform transition duration-300 ease-in-out group-hover:scale-110">
                    {isActive ? <HomeIconActive /> : <HomeIcon />}
                  </div>
                  {!isSearchModalOpen && (
                    <h2 className={`${isActive ? "font-bold" : ""} mx-4 dark:text-white`}>Home</h2>
                  )}
                </>
              )}
            </NavLink>
            <div
              role="button"
              className={`group flex flex-row items-center ${
                isSearchModalOpen ? "border" : ""
              } rounded-lg p-3 transition-opacity duration-300 hover:bg-gray-100 active:opacity-75 dark:hover:bg-black-light`}
              onClick={() => setIsSearchModalOpen(!isSearchModalOpen)}
            >
              <>
                <div className="relative transform transition duration-300 ease-in-out group-hover:scale-110">
                  {isSearchModalOpen ? <SearchActivIcon /> : <SearchIcon />}
                </div>
                {!isSearchModalOpen && (
                  <h2 className={`${isSearchModalOpen ? "font-bold" : ""} mx-4 dark:text-white`}>
                    Search
                  </h2>
                )}
              </>
            </div>
            <NavLink
              onClick={() => setIsSearchModalOpen(false)}
              className="group flex flex-row items-center rounded-lg p-3 hover:bg-gray-100 active:opacity-75 dark:hover:bg-black-light"
              to={ROUTES.EXPLORE}
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <div className="transform transition duration-300 ease-in-out group-hover:scale-110">
                    {isActive ? <ExploreActiveIcon /> : <ExploreIcon />}
                  </div>
                  {!isSearchModalOpen && (
                    <h2 className={`${isActive ? "font-bold" : ""} mx-4 dark:text-white`}>
                      Explore
                    </h2>
                  )}
                </>
              )}
            </NavLink>
            <div
              role="button"
              onClick={() => handleOpenModal("createModal")}
              className="group flex flex-row items-center rounded-lg p-3 transition-opacity duration-300 hover:bg-gray-100 active:opacity-75 dark:hover:bg-black-light"
            >
              <>
                <div className="transform transition duration-300 ease-in-out group-hover:scale-110">
                  {isCreateModalOpen ? <CreateActivIcon /> : <CreateIcon />}
                </div>
                {!isSearchModalOpen && (
                  <h2 className={`${isCreateModalOpen ? "font-bold" : ""} mx-4 dark:text-white`}>
                    Create
                  </h2>
                )}
              </>
            </div>
            <NavLink
              onClick={() => setIsSearchModalOpen(false)}
              className="group flex flex-row items-center rounded-lg p-3 transition-opacity duration-300 hover:bg-gray-100 active:opacity-75 dark:hover:bg-black-light"
              to={`/${currentUsername}/`}
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <div className="transform transition duration-300 ease-in-out group-hover:scale-110">
                    {
                      <img
                        className={`h-7 w-7 rounded-full object-cover ${
                          isActive ? "border-2 border-black-dark dark:border-white" : ""
                        }`}
                        src={currentUserAvatarUrl ? currentUserAvatarUrl : defaultAvatar}
                        onError={handleImageError}
                        alt="avatar"
                      />
                    }
                  </div>
                  {!isSearchModalOpen && (
                    <h2 className={`${isActive ? "font-bold" : ""} mx-4 dark:text-white`}>
                      Profile
                    </h2>
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
              className="group flex flex-row items-center rounded-lg p-3 transition-opacity duration-300 hover:bg-gray-100 active:opacity-75 dark:hover:bg-black-light"
              onClick={() => setIsMoreModalOpen(true)}
            >
              <>
                <div className="relative transform transition duration-300 ease-in-out group-hover:scale-110">
                  {isMoreModalOpen ? <MoreActiveIcon /> : <MoreIcon />}
                </div>
                {!isSearchModalOpen && (
                  <h2 className={`${isMoreModalOpen ? "font-bold" : ""} mx-4 dark:text-white`}>
                    More
                  </h2>
                )}
              </>
            </div>
          </div>
        </aside>
        {isCreateModalOpen && (
          <Modal isOpen={isCreateModalOpen} onRequestClose={() => handleConcilation()}>
            <Create setControlConcilation={setControlConcilation} />
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
          <Modal
            isOpen={avatarModalIsOpen}
            onRequestClose={() => dispatch(closeModal("avatarModal"))}
          >
            <CreateAvatar />
          </Modal>
        )}
      </div>
    </>
  );
};

export default SideBar;
