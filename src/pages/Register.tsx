import { useEffect, useState } from "react";
import InstagramLogoIcon from "../components/common/icons/Instagram/InstagramLogoIcon";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchRegister, selectIsAuth } from "../redux/slices/auth";
import { useAppDispach, useAppSelector } from "../redux/hooks";
import GoogleIcon from "../components/common/icons/Google/GoogleIcon";

const Register = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispach();
  // const [error, setError] = useState("");
  useEffect(() => {
    if (isAuth) {
      navigate("/", { replace: true });
    }
  }, []);

  const [data, setData] = useState({
    username: "vasia16",
    fullName: "Pupkin Vasia",
    email: "pupkin@mail.ru",
    password: "1234",
  });

  const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = await dispatch(fetchRegister(data));
    if (!userData.payload) {
      alert("Не удалось авторизоваться");
    } else if ("token" in userData.payload) {
      window.localStorage.setItem("token", userData.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/feed" {...{ push: true }} />;
  }
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="mb-2 flex w-3/12 min-w-min flex-col items-center rounded border border-gray-primary bg-white px-8"
        >
          <div className="mt-10">
            <InstagramLogoIcon />
          </div>
          <p className="my-2 text-center text-base font-bold text-gray-medium">
            Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.
          </p>
          <button
            disabled
            className="my-3 flex cursor-no-drop flex-row items-center gap-3 rounded-xl bg-gray-base px-2 py-1 transition-opacity duration-300 hover:opacity-75"
          >
            <GoogleIcon />
            <p className="text-sm">Войти через Google</p>
          </button>
          <div className="mb-4 flex flex-row items-center">
            <hr className="w-24 border border-gray-primary" />
            <p className="mx-3 text-gray-medium">или</p>
            <hr className="w-24 border border-gray-primary" />
          </div>

          <div className="mb-4">
            <input
              className="text-gray-700 my-2 mb-3 w-full appearance-none rounded border border-gray-primary px-3 py-2 text-xs leading-tight focus:border-gray-medium focus:outline-none"
              id="username"
              type="text"
              placeholder="Имя пользователя"
              value={data.username}
              onChange={e => setData({ ...data, username: e.target.value })}
            />
            <input
              className="text-gray-700 mb-3 w-full appearance-none rounded border border-gray-primary px-3 py-2 text-xs leading-tight focus:border-gray-medium focus:outline-none"
              id="fullName"
              type="fullName"
              placeholder="Имя и фамилия"
              value={data.fullName}
              onChange={e => setData({ ...data, fullName: e.target.value })}
            />
            <input
              className="text-gray-700 mb-3 w-full appearance-none rounded border border-gray-primary px-3 py-2 text-xs leading-tight focus:border-gray-medium focus:outline-none"
              id="email"
              type=""
              placeholder="Моб. телефон или эл. адрес"
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
            <p className="my-3 text-center text-xs text-gray-medium">
              Люди, которые пользуются нашим сервисом, могли загрузить вашу контактную информацию в
              Instagram. Подробнее
            </p>
            <p className="my-3 text-center text-xs text-gray-medium">
              Регистрируясь, вы принимаете наши Условия, Политику конфиденциальности и Политику в
              отношении файлов cookie.
            </p>
            <button
              className="focus:shadow-outline mb-4 w-full rounded bg-blue-400 px-4 py-1 text-white hover:bg-blue-primary focus:outline-none disabled:bg-blue-200"
              disabled={
                data.email === "" ||
                data.password === "" ||
                data.username === "" ||
                data.fullName === ""
              }
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
