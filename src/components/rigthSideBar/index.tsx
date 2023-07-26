import UserForm from "./UserForm";
import Suggestions from "./Suggestions";
import Footer from "./Footer";
import { UserData } from "../../types/user";

interface Props {
  user: UserData;
}

const RigthSideBar = ({ user }: Props) => {
  return (
    <div className="mt-8 w-[500px] min-w-max p-4">
      <UserForm user={user} />
      <Suggestions />
      <Footer />
    </div>
  );
};

export default RigthSideBar;
