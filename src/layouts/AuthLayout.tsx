import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="h-screen min-h-screen w-full flex flex-row gap-9 justify-center items-center">
      <Outlet />
    </div>
  );
};
export default AuthLayout;
