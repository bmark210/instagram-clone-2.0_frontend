import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-row">
      <div className="w-64">
        <SideBar />
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
