import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchAuth } from "./redux/slices/auth";
import { selectIsAuth } from "./redux/slices/auth";

const AuthProtection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuth() as any);
    if (!isAuth && !window.localStorage.getItem("token")) {
      navigate("/auth/login", { replace: true });
    }
  }, []);

  return <>{<Outlet />}</>;
};

export default AuthProtection;
