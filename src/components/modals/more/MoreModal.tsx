import SavedLittleIcon from "../../common/icons/Saved/SavedLittleIcon";
import { logout } from "../../../redux/slices/user";
import SettingsLittleIcon from "../../common/icons/Settings/SettingsLittleIcon";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispach } from "../../../redux/hooks";
import * as ROUTES from "../../../constants/routes";
import MoonIcon from "../../common/icons/themeIcons/MoonIcon";
import SunIcon from "../../common/icons/themeIcons/SunIcon";
import { getPreferredTheme } from "../../../utils/getPreferredTheme";

interface Props {
  setIsMoreModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  username?: string;
}

const MoreModal = ({ setIsMoreModalOpen, username }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispach();
  const isDarkTheme = document.documentElement.classList.contains("dark");
  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate(ROUTES.LOGIN, { replace: true });
  };
  const currentTheme = localStorage.getItem("theme");

  const handleChangeTheme = () => {
    if (currentTheme === "light") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (getPreferredTheme() === "dark") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("dark"),
        document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div
      onClick={() => setIsMoreModalOpen(false)}
      className="fixed left-0 top-0 z-50 h-full w-full"
    >
      <div className="flex-column absolute bottom-0 mb-20 ml-3 h-56 w-72 rounded-2xl bg-white p-2 shadow-2xl dark:bg-zinc-700">
        <div
          onClick={handleChangeTheme}
          className="flex flex-row items-center gap-3 rounded-md px-2 hover:bg-gray-100 dark:hover:bg-zinc-600"
        >
          {isDarkTheme ? <MoonIcon /> : <SunIcon />}
          <button className=" py-3 text-left text-black-dark dark:text-white">
            Switch appearance
          </button>
        </div>
        <Link
          to={`/${username}/saved/`}
          className="flex flex-row items-center gap-3 rounded-md px-2 py-3 hover:bg-gray-100 dark:hover:bg-zinc-600"
        >
          <SavedLittleIcon />
          <button className="w-full text-left text-black-dark dark:text-white">Saved</button>
        </Link>
        <Link
          to={ROUTES.SETTINGS}
          className="flex flex-row items-center gap-3 rounded-md px-2 py-3 hover:bg-gray-100 dark:hover:bg-zinc-600"
        >
          <SettingsLittleIcon />
          <button className="w-full text-left text-black-dark dark:text-white">Settings</button>
        </Link>
        <hr className="b-border my-2 w-full border-gray-100 dark:border-zinc-600" />
        <button
          onClick={onClickLogout}
          className="w-full rounded-md px-2 py-3 text-left text-black-dark hover:bg-gray-100 dark:text-white dark:hover:bg-zinc-600"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default MoreModal;
