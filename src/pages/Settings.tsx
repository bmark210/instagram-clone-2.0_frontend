import { NavLink, Outlet } from "react-router-dom";
import AdIcon from "../components/common/icons/AdIcon";
import metaLogo from "../assets/meta.png";
import PersonIcon from "../components/common/icons/PersonIcon";
import SecurityIcon from "../components/common/icons/SecurityIcon";
import * as ROUTES from "../constants/routes";

const Settings = () => {
  return (
    <>
      <h1 className="absolute m-7 ml-72 text-2xl font-medium dark:text-white">Settings</h1>
      <div className="relative mx-auto my-20 flex w-3/5 min-w-max flex-row rounded-sm border border-gray-base dark:border-zinc-600 dark:text-white">
        <div>
          <div className="w-56 border-r border-gray-base pb-5 pl-6 pr-2 pt-7 dark:border-zinc-600">
            <div className="flex flex-row items-center">
              <img src={metaLogo} alt="meta_logo" className="h-6" />
              <p className="text-lg">Meta</p>
            </div>
            <h3 className="mb-2 mt-3 font-medium">Accounts Center</h3>
            <p className="mb-3 text-xs">
              Manage your connected experiences and account settings across Meta technologies.
            </p>
            <div className="mb-2 flex flex-row gap-2">
              <PersonIcon />
              <p className="text-xs">Personal details</p>
            </div>
            <div className="mb-2 flex flex-row gap-2">
              <SecurityIcon />
              <p className="text-xs">Password and security</p>
            </div>
            <div className="mb-2 flex flex-row gap-2">
              <AdIcon />
              <p className="text-xs">Ad preferences</p>
            </div>
            <p className="cursor-no-drop text-sm font-medium text-blue-pure">
              See more in Accounts Center
            </p>
          </div>
          <div className="min-w-56 flex h-fit flex-col border-r border-t border-gray-base dark:border-zinc-600">
            <NavLink
              to={ROUTES.EDIT_PROFILE}
              className="hover:bg-gray-100 dark:hover:bg-black-light"
            >
              {({ isActive }: { isActive: boolean }) => (
                <div
                  className={`${
                    isActive ? "border-l border-black-dark font-medium dark:border-white" : ""
                  } py-3`}
                >
                  <p className="ml-3">Edit profile</p>
                </div>
              )}
            </NavLink>
            <NavLink
              to={ROUTES.MANAGE_ACCESS}
              className="hover:bg-gray-100 dark:hover:bg-black-light"
            >
              {({ isActive }: { isActive: boolean }) => (
                <div
                  className={`${
                    isActive ? "border-l border-black-dark font-medium dark:border-white" : ""
                  } py-3`}
                >
                  <p className="ml-3">Apps and websites</p>
                </div>
              )}
            </NavLink>
            <div className="cursor-no-drop hover:bg-gray-100 dark:hover:bg-black-light">
              <p className="ml-3 py-3">Email notifications</p>
            </div>
            <div className="cursor-no-drop hover:bg-gray-100 dark:hover:bg-black-light">
              <p className="ml-3 py-3">Push notifications</p>
            </div>
            <div className="cursor-no-drop hover:bg-gray-100 dark:hover:bg-black-light">
              <p className="ml-3 py-3">What you see</p>
            </div>
            <div className="cursor-no-drop hover:bg-gray-100 dark:hover:bg-black-light">
              <p className="ml-3 py-3">Who can see your content</p>
            </div>
            <div className="w-56 cursor-no-drop py-3 hover:bg-gray-100 dark:hover:bg-black-light">
              <p className="ml-3">How others can interact with you</p>
            </div>
            <div className="cursor-no-drop hover:bg-gray-100 dark:hover:bg-black-light">
              <p className="ml-3 py-3">Supervision</p>
            </div>
            <div className="cursor-no-drop hover:bg-gray-100 dark:hover:bg-black-light">
              <p className="ml-3 py-3">Help</p>
            </div>
          </div>
        </div>
        <div className="w-[693px]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Settings;
