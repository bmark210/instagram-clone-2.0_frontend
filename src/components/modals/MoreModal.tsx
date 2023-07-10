import SavedLittleIcon from "../common/icons/Saved/SavedLittleIcon";
import { logout } from "../../redux/slices/auth";
import SettingsLittleIcon from "../common/icons/Settings/SettingsLittleIcon";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispach } from "../../redux/hooks";

interface Props {
  setIsMoreModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  username?: string;
}

const MoreModal = ({ setIsMoreModalOpen, username }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispach();
  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate("/auth/login");
  };
  return (
    <div
      onClick={() => setIsMoreModalOpen(false)}
      className="fixed top-0 left-0 w-full h-full"
    >
      <div className="w-72 h-44 flex-column absolute p-2 ml-5 bottom-0 mb-24 bg-white rounded-2xl shadow-2xl">
        <Link
          to={`/${username}/saved/`}
          className="flex flex-row items-center gap-3 hover:bg-gray-100 px-2 py-3 rounded-md "
        >
          <SavedLittleIcon />
          <button className="w-full text-left text-black-dark ">Saved</button>
        </Link>
        <Link
          to="/settings"
          className="flex flex-row items-center gap-3 hover:bg-gray-100 px-2 py-3 rounded-md"
        >
          <SettingsLittleIcon />
          <button className="w-full text-left text-black-dark ">
            Settings
          </button>
        </Link>
        <hr className="b-border border-gray-100 w-full my-2" />
        <button
          onClick={onClickLogout}
          className="w-full text-left px-2 py-3 rounded-md text-black-dark hover:bg-gray-100"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default MoreModal;
