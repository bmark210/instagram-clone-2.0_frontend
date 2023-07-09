import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import AdIcon from "../components/common/icons/AdIcon";
import MetaIcon from "../components/common/icons/MetaIcon/MetaIcon";
import PersonIcon from "../components/common/icons/PersonIcon";
import SecurityIcon from "../components/common/icons/SecurityIcon";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import defaultAvatar from "../assets/avatars/default_avatar.jpg";
import Header from "../components/post/header";
import Footer from "../components/Footer";

const Settings = () => {
  return (
    <>
      <h1 className="absolute m-7 ml-72 text-2xl font-medium">Settings</h1>
      <div className="relative min-w-max flex flex-row mx-auto w-3/5 my-20 border border-gray-base rounded-sm">
        <div>
          <div className="w-56 border-r border-gray-base pt-7 pl-6 pr-2 pb-5">
            <MetaIcon />
            <h3 className="font-medium mt-3 mb-2">Accounts Center</h3>
            <p className="text-xs mb-3">
              Manage your connected experiences and account settings across Meta
              technologies.
            </p>
            <div className="flex flex-row gap-2 mb-2">
              <PersonIcon />
              <p className="text-xs">Personal details</p>
            </div>
            <div className="flex flex-row gap-2 mb-2">
              <SecurityIcon />
              <p className="text-xs">Password and security</p>
            </div>
            <div className="flex flex-row gap-2 mb-2">
              <AdIcon />
              <p className="text-xs">Ad preferences</p>
            </div>
            <p className="text-blue-primary text-sm font-medium cursor-no-drop">
              See more in Accounts Center
            </p>
          </div>
          <div className="flex flex-col border-t border-r border-gray-base min-w-56 h-fit">
            <NavLink className="hover:bg-gray-100" to="/settings/edit">
              {({ isActive }: { isActive: boolean }) => (
                <div
                  className={`${
                    isActive ? "font-medium border-l border-black-dark" : ""
                  } py-3`}
                >
                  <p className="ml-3">Edit profile</p>
                </div>
              )}
            </NavLink>
            <NavLink className="hover:bg-gray-100" to="/settings/manage_access">
              {({ isActive }: { isActive: boolean }) => (
                <div
                  className={`${
                    isActive ? "font-medium border-l border-black-dark " : ""
                  } py-3`}
                >
                  <p className="ml-3">Apps and websites</p>
                </div>
              )}
            </NavLink>
            <div className="hover:bg-gray-100 cursor-no-drop">
              <p className="ml-3 py-3">Email notifications</p>
            </div>
            <div className="hover:bg-gray-100 cursor-no-drop">
              <p className="ml-3 py-3">Push notifications</p>
            </div>
            <div className="hover:bg-gray-100 cursor-no-drop">
              <p className="ml-3 py-3">What you see</p>
            </div>
            <div className="hover:bg-gray-100 cursor-no-drop">
              <p className="ml-3 py-3">Who can see your content</p>
            </div>
            <div className="hover:bg-gray-100 cursor-no-drop py-3 w-56">
              <p className="ml-3">How others can interact with you</p>
            </div>
            <div className="hover:bg-gray-100 cursor-no-drop">
              <p className="ml-3 py-3">Supervision</p>
            </div>
            <div className="hover:bg-gray-100 cursor-no-drop">
              <p className="ml-3 py-3">Help</p>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Settings;
