import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchAuth } from "../redux/slices/user";
import { selectIsAuth } from "../redux/slices/user";
import { useAppDispach, useAppSelector } from "../redux/hooks";
import { LOGIN } from "../constants/routes";
import { getPreferredTheme } from "../utils/getPreferredTheme";

const AuthSecurity = () => {
  const dispatch = useAppDispach();
  const navigate = useNavigate();
  // const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || getPreferredTheme();
    document.documentElement.classList.add(theme);
  }, []);

  useEffect(() => {
    async function fetchData() {
      console.log("fetching data");
      try {
        await dispatch(fetchAuth()).unwrap();
      } catch (err) {
        console.error("err", err);
        navigate(LOGIN, { replace: true });
      }
    }

    fetchData();
    // if (!isAuth && !window.localStorage.getItem("token")) {
    //   navigate(LOGIN, { replace: true });
    // }
  }, [dispatch, navigate]);
  return <Outlet />;
};

export default AuthSecurity;
