import { useState, useEffect } from "react";
import home_phones from "../assets/images/instLigin.jpg";
import InstagramLogoIcon from "../components/common/icons/InstagramLogoIcon";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLogin, selectIsAuth } from "../redux/slices/auth";
import { useSelector } from "react-redux";
import { LoginParams } from "../types/authTypes";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error] = useState("");

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
    const userData = await dispatch(fetchLogin(data) as any);
    console.log("userData", userData);

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
          className="w-80 flex flex-col items-center bg-white border border-gray-primary rounded px-8 mb-2"
        >
          <div className="my-10">
            <InstagramLogoIcon width="165" height="60" />
          </div>
          <div className="mb-4">
            <input
              className="my-2 appearance-none text-xs border-gray-primary border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-medium"
              id="email"
              type="text"
              placeholder="Телефон, имя пользователя или эл. адрес"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <input
              className="appearance-none text-xs border-gray-primary border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-gray-medium"
              id="password"
              type="password"
              placeholder="Пароль"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <div />
            <button
              className="bg-blue-400 w-full disabled:bg-blue-200 hover:bg-blue-primary text-white py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={!data.email || !data.password}
            >
              Войти
            </button>
          </div>
          <div className="flex flex-row items-center mb-4">
            <hr className="border-gray-primary w-24 border" />
            <p className="mx-3 text-gray-medium">или</p>
            <hr className="border-gray-primary w-24 border" />
          </div>
          <button className="flex flex-row bg-gray-base my-3 items-center gap-3 rounded-xl transition-opacity duration-300 hover:opacity-75 py-1 px-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="signin with google"
              className="w-4"
            />
            <p className="text-sm">Войти через Google</p>
          </button>
          {error && (
            <span className="text-sm text-center my-6 text-red-primary">
              {error}
            </span>
          )}
          <button disabled={true} className="text-xs text-gray-medium my-4">
            Забыли пароль?
          </button>
        </form>
        <div className="w-80 flex flex-row items-center bg-white border gap-2 border-gray-primary rounded py-5 px-7">
          <p className="text-xs">У вас ещё нет аккаунта?</p>
          <Link
            to="/auth/register"
            className="text-xs font-bold text-blue-primary"
          >
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
