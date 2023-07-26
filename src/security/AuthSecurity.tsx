import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchAuth } from "../redux/slices/auth";
import { selectIsAuth } from "../redux/slices/auth";
import { useAppDispach, useAppSelector } from "../redux/hooks";

const AuthSecurity = () => {
  const dispatch = useAppDispach();
  const navigate = useNavigate();
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuth());
    if (!isAuth && !window.localStorage.getItem("token")) {
      navigate("/auth/login", { replace: true });
    }
  }, []);

  return <Outlet />;
};

export default AuthSecurity;
