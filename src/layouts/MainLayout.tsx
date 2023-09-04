import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-row dark:bg-black-dark">
      <div className="mx-3 w-64">
        <SideBar />
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
