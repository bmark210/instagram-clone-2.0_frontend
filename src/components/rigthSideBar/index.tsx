import UserForm from "./User";
import Suggestions from "./Suggestions";
import Footer from "./Footer";
import { User } from "../../types/user/user";

interface Props {
  user: User;
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
