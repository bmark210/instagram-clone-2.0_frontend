import UserForm from "./UserForm";
import Suggestions from "./Suggestions";
import Footer from "./Footer";
import { UserData } from "../../interfaces/user";

interface Props {
  user: UserData;
}

const RigthSideBar = ({ user }: Props) => {
  return (
    <div className="mr-10 mt-8 w-1/5 min-w-max p-4 tablet:hidden laptop:block desktop:block">
      <UserForm user={user} />
      <Suggestions />
      <Footer />
    </div>
  );
};

export default RigthSideBar;
