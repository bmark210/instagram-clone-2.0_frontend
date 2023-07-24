import { useState, useEffect } from "react";
import home_phones from "../assets/images/instLigin.jpg";
import InstagramLogoIcon from "../components/common/icons/Instagram/InstagramLogoIcon";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { fetchLogin, selectIsAuth } from "../redux/slices/auth";
import { LoginParams } from "../types/auth";
import { useAppDispach, useAppSelector } from "../redux/hooks";
import GoogleIcon from "../components/common/icons/Google/GoogleIcon";

const Login = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const authError = useAppSelector(state => state.auth.error);
  const dispatch = useAppDispach();
  const navigate = useNavigate();
  console.log(authError);

  useEffect(() => {
    if (isAuth) {
      navigate("/", { replace: true });
    }
  }, []);

  const [data, setData] = useState<LoginParams>({
    email: "baltenco@yandex.ru",
    password: "12345",
  });

  const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = await dispatch(fetchLogin(data));

    if (!userData.payload) {
      alert("Не удалось авторизоваться");
    } else if ("token" in userData.payload) {
      window.localStorage.setItem("token", userData.payload.token);
    }
  };

  if (isAuth) return <Navigate to="/feed" {...{ push: true }} />;
  return (
    <>
      <div className="w-1/4 min-w-max">
        <img src={home_phones} alt="Picture" />
      </div>
      <div className="w-1/4">
        <form
          onSubmit={onSubmit}
          className="mb-2 flex w-80 flex-col items-center rounded border border-gray-primary bg-white px-8"
        >
          <div className="my-10">
            <InstagramLogoIcon />
          </div>
          <div className="mb-4">
            <input
              className="text-gray-700 my-2 w-full appearance-none rounded border border-gray-primary px-3 py-2 text-xs leading-tight focus:border-gray-medium focus:outline-none"
              id="email"
              type="text"
              placeholder="Телефон, имя пользователя или эл. адрес"
              value={data.email}
              onChange={e => setData({ ...data, email: e.target.value })}
            />
            <input
              className="text-gray-700 mb-3 w-full appearance-none rounded border border-gray-primary px-3 py-2 text-xs leading-tight focus:border-gray-medium focus:outline-none"
              id="password"
              type="password"
              placeholder="Пароль"
              value={data.password}
              onChange={e => setData({ ...data, password: e.target.value })}
            />
            <div />
            <button
              className="focus:shadow-outline w-full rounded bg-blue-400 px-4 py-1 text-white hover:bg-blue-primary focus:outline-none disabled:bg-blue-200"
              type="submit"
              disabled={!data.email || !data.password}
            >
              Войти
            </button>
          </div>
          <div className="mb-4 flex flex-row items-center">
            <hr className="w-24 border border-gray-primary" />
            <p className="mx-3 text-gray-medium">или</p>
            <hr className="w-24 border border-gray-primary" />
          </div>
          <button
            disabled
            className="my-3 flex cursor-no-drop flex-row items-center gap-3 rounded-xl bg-gray-base px-2 py-1 transition-opacity duration-300 hover:opacity-75"
          >
            <GoogleIcon />
            <p className="text-sm">Войти через Google</p>
          </button>
          {authError && (
            <span className="my-6 text-center text-sm text-red-primary">{authError}</span>
          )}
          <button disabled={true} className="my-4 text-xs text-gray-medium">
            Забыли пароль?
          </button>
        </form>
        <div className="flex w-80 flex-row items-center gap-2 rounded border border-gray-primary bg-white px-7 py-5">
          <p className="text-xs">У вас ещё нет аккаунта?</p>
          <Link to="/auth/register" className="text-xs font-bold text-blue-primary">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
