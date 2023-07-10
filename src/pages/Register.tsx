import { useEffect, useState } from "react";
import InstagramLogoIcon from "../components/common/icons/InstagramLogoIcon";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchRegister, selectIsAuth } from "../redux/slices/auth";
import { useAppDispach, useAppSelector } from "../redux/hooks";

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
    console.log(userData);
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
      <div className="w-full h-screen flex justify-center items-center">
        <form
          onSubmit={onSubmit}
          className="w-3/12 min-w-min flex flex-col items-center bg-white border border-gray-primary rounded px-8 mb-2"
        >
          <div className="mt-10">
            <InstagramLogoIcon width="165" height="60" />
          </div>
          <p className="text-gray-medium font-bold text-base my-2 text-center">
            Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.
          </p>
          <button className="flex flex-row bg-gray-base my-3 items-center gap-3 rounded-xl transition-opacity duration-300 hover:opacity-75 py-1 px-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="signin with google"
              className="w-4"
            />
            <p className="text-sm">Войти через Google</p>
          </button>
          <div className="flex flex-row items-center mb-4">
            <hr className="border-gray-primary w-24 border" />
            <p className="mx-3 text-gray-medium">или</p>
            <hr className="border-gray-primary w-24 border" />
          </div>

          <div className="mb-4">
            <input
              className="my-2 appearance-none text-xs border-gray-primary border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-gray-medium"
              id="username"
              type="text"
              placeholder="Имя пользователя"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
            <input
              className="appearance-none text-xs border-gray-primary border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-gray-medium"
              id="fullName"
              type="fullName"
              placeholder="Имя и фамилия"
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
            />
            <input
              className="appearance-none text-xs border-gray-primary border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-gray-medium"
              id="email"
              type=""
              placeholder="Моб. телефон или эл. адрес"
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
            <p className="text-xs text-gray-medium text-center my-3">
              Люди, которые пользуются нашим сервисом, могли загрузить вашу
              контактную информацию в Instagram. Подробнее
            </p>
            <p className="text-xs text-gray-medium text-center my-3">
              Регистрируясь, вы принимаете наши Условия, Политику
              конфиденциальности и Политику в отношении файлов cookie.
            </p>
            <button
              className="bg-blue-400 w-full mb-4 disabled:bg-blue-200 hover:bg-blue-primary text-white py-1 px-4 rounded focus:outline-none focus:shadow-outline"
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
