import { useEffect, useState } from "react";
import InstagramLogoIcon from "../components/common/icons/Instagram/InstagramLogoIcon";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, fetchRegister, selectIsAuth } from "../redux/slices/user";
import { useAppDispach, useAppSelector } from "../redux/hooks";
import GoogleIcon from "../components/common/icons/Google/GoogleIcon";
import AuthLoader from "../components/common/loaders/AuthLoader";
import { FEED, LOGIN } from "../constants/routes";
import { useForm } from "react-hook-form";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });
  const isAuth = useAppSelector(selectIsAuth);
  const { error } = useAppSelector(state => state.auth);
  const errorMessage = Array.isArray(error?.register)
    ? error?.register[0]?.msg
    : error?.register?.msg;
  const navigate = useNavigate();
  const dispatch = useAppDispach();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  useEffect(() => {
    if (isAuth) {
      navigate(FEED, { replace: true });
    }
  }, [isAuth, navigate]);

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
      const userData = await dispatch(fetchRegister(formData));
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
    <div className="w-[340px] bg-white dark:bg-black-dark">
      <div className="mb-2 flex flex-col items-center justify-center rounded border border-gray-primary px-8 dark:border-zinc-600 ">
        <div className="mt-8">
          <InstagramLogoIcon />
        </div>
        <p className="my-2 text-center text-base font-bold text-gray-medium">
          Sign up to see photos and videos from your friends.
        </p>
        <button
          disabled
          className="my-3 flex cursor-no-drop flex-row items-center gap-3 rounded-xl bg-gray-base px-2 py-1 transition-opacity duration-300 hover:opacity-30 dark:bg-gray-100"
        >
          <GoogleIcon />
          <p className="text-sm">Log in with Google</p>
        </button>
        <div className="mb-4 flex flex-row items-center">
          <hr className="w-24 border border-gray-primary dark:border-zinc-600" />
          <p className="mx-3 text-gray-medium">or</p>
          <hr className="w-24 border border-gray-primary dark:border-zinc-600" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-2 flex h-full w-full min-w-min">
          <div className="mb-4 w-full">
            <input
              {...register("username", { required: true })}
              aria-invalid={errors.username ? "true" : "false"}
              className={`${
                errors.username
                  ? "outline-current"
                  : "border-gray-primary focus:border-gray-medium dark:border-zinc-600 dark:focus:outline-white"
              } text-gray-700 my-2 w-full appearance-none rounded border px-3  py-2 text-xs leading-tight dark:bg-black-dark dark:text-white`}
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username?.type === "required" && (
              <span className="mb-2 ml-1 text-xs text-rose-500" role="alert">
                Username is required
              </span>
            )}
            <input
              {...register("fullName", { required: true })}
              aria-invalid={errors.fullName ? "true" : "false"}
              className={`${
                errors.fullName
                  ? "outline-current"
                  : "border-gray-primary focus:border-gray-medium dark:border-zinc-600 dark:focus:outline-white"
              } text-gray-700 my-2 w-full appearance-none rounded border px-3  py-2 text-xs leading-tight dark:bg-black-dark dark:text-white`}
              name="fullName"
              type="fullName"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName?.type === "required" && (
              <span className="mb-2 ml-1 text-xs text-rose-500" role="alert">
                FullName is required
              </span>
            )}
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
              <span className="mb-2 ml-1 text-xs text-rose-500" role="alert">
                Email is required
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="mb-2 ml-1 text-xs text-rose-500" role="alert">
                Email format is invalid
              </span>
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
                    : "border-gray-primary focus:border-gray-medium dark:border-zinc-600 dark:focus:outline-white"
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
              disabled={isLoading}
            >
              {isLoading ? <AuthLoader /> : <h3>Sign Up</h3>}
            </button>
          </div>
        </form>
        {errorMessage && (
          <span className="my-2 block text-center text-sm text-rose-500">{errorMessage}</span>
        )}
        <p className="my-3 text-center text-xs text-gray-medium">
          By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .
        </p>
      </div>
      <div className="flex w-full min-w-max justify-center gap-2 rounded border border-gray-primary bg-white px-7 py-3 dark:border-zinc-600 dark:bg-black-dark">
        <p className="text-xs dark:text-white">Have an account?</p>
        <Link to={LOGIN} className="text-xs font-bold text-blue-pure">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Register;
