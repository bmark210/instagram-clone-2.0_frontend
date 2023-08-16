import { useState, useEffect } from "react";
import home_phones from "../assets/images/instLigin.jpg";
import InstagramLogoIcon from "../components/common/icons/Instagram/InstagramLogoIcon";
import { Link, useNavigate } from "react-router-dom";
import { fetchLogin, selectIsAuth } from "../redux/slices/user";
import { useAppDispach, useAppSelector } from "../redux/hooks";
import GoogleIcon from "../components/common/icons/Google/GoogleIcon";
import AuthLoader from "../components/common/loaders/AuthLoader";
import { FEED, REGISTER } from "../constants/routes";
import { validator } from "../utils/validator";
import { ValidationConfig } from "../interfaces/validationConfig";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const isAuth = useAppSelector(selectIsAuth);
  const { error } = useAppSelector(state => state.auth);
  const errorMessage = Array.isArray(error) ? error[0]?.msg : error?.msg;
  const dispatch = useAppDispach();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [frontErrors, setFrontErrors] = useState<string[]>([]);

  useEffect(() => {
    if (isAuth) {
      navigate(FEED, { replace: true });
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    validate();
  }, [formData]);

  const validatorConfig: ValidationConfig = {
    email: {
      isRequired: {
        message: "Email is required",
      },
      isEmail: {
        message: "Email format is invalid",
      },
    },
    password: {
      isRequired: {
        message: "Password is required",
      },
      min: {
        message: "Password must be at least 5 characters",
        value: 5,
      },
    },
  };
  const validate = () => {
    const errors = validator(formData, validatorConfig);
    setFrontErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = Object.keys(frontErrors).length === 0;
    if (!isValid) {
      alert(frontErrors[0]);
    } else {
      try {
        setIsLoading(true);
        const userData = await dispatch(fetchLogin(formData));
        if (!userData.payload) {
          console.log("Не удалось авторизоваться");
        } else if ("token" in userData.payload) {
          window.localStorage.setItem("token", userData.payload.token);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

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
              name="email"
              type="text"
              placeholder="Phone number, username, or email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="text-gray-700 mb-3 w-full appearance-none rounded border border-gray-primary px-3 py-2 text-xs leading-tight focus:border-gray-medium focus:outline-none"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <div />
            <button
              className="focus:shadow-outline h-8 w-full rounded bg-blue-400 px-4 py-1 text-white hover:bg-blue-primary focus:outline-none disabled:bg-blue-200"
              type="submit"
              disabled={formData.email === "" || formData.password === "" || isLoading}
            >
              {isLoading ? <AuthLoader /> : <h3>Log in</h3>}
            </button>
          </div>
          <div className="mb-4 flex flex-row items-center">
            <hr className="w-24 border border-gray-primary" />
            <p className="mx-3 text-gray-medium">or</p>
            <hr className="w-24 border border-gray-primary" />
          </div>
          <button
            disabled
            className="my-3 flex cursor-no-drop flex-row items-center gap-3 rounded-xl bg-gray-base px-2 py-1 transition-opacity duration-300 hover:opacity-75"
          >
            <GoogleIcon />
            <p className="text-sm">Log in with Google</p>
          </button>
          {errorMessage && (
            <span className="my-4 text-center text-xs text-red-primary">{errorMessage}</span>
          )}
          <button disabled={true} className="my-4 text-xs text-gray-medium">
            Forgot password?
          </button>
        </form>
        <div className="flex w-80 flex-row items-center justify-center gap-2 rounded border border-gray-primary bg-white px-7 py-5">
          <p className="text-xs">Don't have an account?</p>
          <Link to={REGISTER} className="text-xs font-bold text-blue-primary">
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
