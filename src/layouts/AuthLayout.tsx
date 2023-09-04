import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex h-screen min-h-screen w-full flex-row items-center justify-center gap-9 dark:bg-black-dark">
      <Outlet />
    </div>
  );
};
export default AuthLayout;
