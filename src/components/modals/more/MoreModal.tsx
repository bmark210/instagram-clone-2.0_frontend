import SavedLittleIcon from "../../common/icons/Saved/SavedLittleIcon";
import { logout } from "../../../redux/slices/user";
import SettingsLittleIcon from "../../common/icons/Settings/SettingsLittleIcon";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispach } from "../../../redux/hooks";
import * as ROUTES from "../../../constants/routes";

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
    navigate(ROUTES.LOGIN, { replace: true });
  };
  return (
    <div
      onClick={() => setIsMoreModalOpen(false)}
      className="fixed left-0 top-0 z-50 h-full w-full"
    >
      <div className="flex-column absolute bottom-0 mb-20 ml-3 h-44 w-72 rounded-2xl bg-white p-2 shadow-2xl">
        <Link
          to={`/${username}/saved/`}
          className="flex flex-row items-center gap-3 rounded-md px-2 py-3 hover:bg-gray-100 "
        >
          <SavedLittleIcon />
          <button className="w-full text-left text-black-dark ">Saved</button>
        </Link>
        <Link
          to={ROUTES.SETTINGS}
          className="flex flex-row items-center gap-3 rounded-md px-2 py-3 hover:bg-gray-100"
        >
          <SettingsLittleIcon />
          <button className="w-full text-left text-black-dark ">Settings</button>
        </Link>
        <hr className="b-border my-2 w-full border-gray-100" />
        <button
          onClick={onClickLogout}
          className="w-full rounded-md px-2 py-3 text-left text-black-dark hover:bg-gray-100"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default MoreModal;
