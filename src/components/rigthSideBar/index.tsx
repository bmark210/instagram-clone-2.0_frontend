import UserForm from "./user";
import Suggestions from "./suggestions";
import Footer from "./Footer";

interface Props {
  user?: any;
}

const RigthSideBar = ({ user }: Props) => {
  console.log('user', user);
  
  return (
    <div className="w-96 min-w-max p-4 mt-8">
      <UserForm user={user} />
      <Suggestions user={user} />
      <Footer />
    </div>
  );
};

export default RigthSideBar;
