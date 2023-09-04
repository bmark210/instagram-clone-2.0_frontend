import { useState, useEffect } from "react";
import home_phones from "../assets/images/home_phones.png";
import InstagramLogoIcon from "../components/common/icons/Instagram/InstagramLogoIcon";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, fetchLogin, selectIsAuth } from "../redux/slices/user";
import { useAppDispach, useAppSelector } from "../redux/hooks";
import GoogleIcon from "../components/common/icons/Google/GoogleIcon";
import AuthLoader from "../components/common/loaders/AuthLoader";
import { FEED, REGISTER } from "../constants/routes";
import { useForm } from "react-hook-form";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const isAuth = useAppSelector(selectIsAuth);
  const { error } = useAppSelector(state => state.auth);
  const errorMessage = Array.isArray(error?.login) ? error?.login[0]?.msg : error?.login?.msg;
  const dispatch = useAppDispach();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  useEffect(() => {
    if (isAuth) {
      navigate(FEED, { replace: true });
    }
  }, [isAuth, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    if (!isValid) return;
    try {
      setIsLoading(true);
      const userData = await dispatch(fetchLogin(formData));
      if (!userData.payload) {
        console.log("Не удалось авторизоваться");
      } else if ("token" in userData.payload) {
        window.localStorage.setItem("token", userData.payload.token);
        dispatch(clearErrors());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <>
      <div className="w-1/4 min-w-max">
        <img className="border-gray-primary" src={home_phones} alt="Picture" />
      </div>
      <div className=" w-80 ">
        <div className="flex flex-col items-center rounded border border-gray-primary bg-white px-8 dark:border-zinc-600 dark:bg-black-dark">
          <div className="my-10">
            <InstagramLogoIcon />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-4 w-full">
            <input
              {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/g })}
              aria-invalid={errors.email ? "true" : "false"}
              className={`${
                errors.email
                  ? "outline-current"
                  : "border-gray-primary focus:border-gray-medium dark:border-zinc-600 dark:focus:outline-white"
              } text-gray-700 my-2 w-full appearance-none rounded border px-3  py-2 text-xs leading-tight dark:bg-black-dark dark:text-white`}
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email?.type === "required" && (
              <p className="mb-3 text-xs text-rose-500 " role="alert">
                Email is required
              </p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="mb-3 text-xs text-rose-500" role="alert">
                Email format is invalid
              </p>
            )}
            <div className="relative mb-5">
              <button
                type="button"
                disabled={formData.password === ""}
                className="absolute right-3 top-4 z-10 text-xs dark:text-white"
                onClick={togglePasswordVisiblity}
              >
                {passwordShown ? "Hide" : "Show"}
              </button>
              <input
                {...register("password", { required: true, minLength: 5 })}
                aria-invalid={errors.password ? "true" : "false"}
                className={`${
                  errors.password
                    ? "outline-current"
                    : "border-gray-primary focus:border-gray-medium focus:outline-current dark:border-zinc-600"
                } text-gray-700 my-2 w-full appearance-none rounded border px-3  py-2 text-xs leading-tight dark:bg-black-dark dark:text-white`}
                name="password"
                type={passwordShown ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password?.type === "required" && (
                <p className="text-xs text-rose-500" role="alert">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-xs text-rose-500" role="alert">
                  Password must be at least 5 characters
                </p>
              )}
            </div>
            <button
              className="h-8 w-full rounded bg-blue-400 px-4 py-1 text-white hover:bg-blue-pure focus:outline-black-dark disabled:bg-blue-200 dark:outline-white dark:disabled:bg-blue-pure"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <AuthLoader /> : <h3>Log in</h3>}
            </button>
          </form>
          <div className="my-4 flex flex-row items-center">
            <hr className="w-24 border border-gray-primary dark:border-zinc-600" />
            <p className="mx-3 text-gray-medium">or</p>
            <hr className="w-24 border border-gray-primary dark:border-zinc-600" />
          </div>
          <button
            disabled
            className="my-3 flex cursor-no-drop flex-row items-center gap-3 rounded-xl bg-gray-base px-2 py-1 transition-opacity duration-300 hover:opacity-30 dark:bg-gray-100"
          >
            <GoogleIcon />
            <p className="text-sm">Log in with Google</p>
          </button>
          {errorMessage && (
            <span className="my-4 text-center text-xs text-rose-500">{errorMessage}</span>
          )}
          <button disabled={true} className="my-4 text-xs text-gray-medium">
            Forgot password?
          </button>
        </div>
        <div className="mt-4 flex w-80 flex-row items-center justify-center gap-2 rounded border border-gray-primary bg-white px-7 py-5 dark:border-zinc-600 dark:bg-black-dark">
          <p className="text-xs dark:text-white">Don't have an account?</p>
          <Link to={REGISTER} className="text-xs font-bold text-blue-pure">
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
