import { useEffect, useState } from "react";
import InstagramLogoIcon from "../components/common/icons/Instagram/InstagramLogoIcon";
import { Link, useNavigate } from "react-router-dom";
import { fetchRegister, selectIsAuth } from "../redux/slices/user";
import { useAppDispach, useAppSelector } from "../redux/hooks";
import GoogleIcon from "../components/common/icons/Google/GoogleIcon";
import AuthLoader from "../components/common/loaders/AuthLoader";
import { FEED, LOGIN } from "../constants/routes";
import { ValidationConfig } from "../interfaces/validationConfig";
import { validator } from "../utils/validator";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });
  const isAuth = useAppSelector(selectIsAuth);
  const { error } = useAppSelector(state => state.auth);
  const errorMessage = Array.isArray(error) ? error[0]?.msg : error?.msg;
  const navigate = useNavigate();
  const dispatch = useAppDispach();
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

  const validatorConfig: ValidationConfig = {
    username: {
      isRequired: {
        message: "Username is required",
      },
    },
    fullName: {
      isRequired: {
        message: "Full name is required",
      },
    },
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

  const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = Object.keys(frontErrors).length === 0;
    if (!isValid) {
      alert(frontErrors[0]);
    } else {
      try {
        setIsLoading(true);
        const userData = await dispatch(fetchRegister(formData));
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
      <div className="flex h-screen w-3/12 flex-col items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="mb-2 flex min-w-min flex-col items-center rounded border border-gray-primary bg-white px-8"
        >
          <div className="mt-10">
            <InstagramLogoIcon />
          </div>
          <p className="my-2 text-center text-base font-bold text-gray-medium">
            Sign up to see photos and videos from your friends.
          </p>
          <button
            disabled
            className="my-3 flex cursor-no-drop flex-row items-center gap-3 rounded-xl bg-gray-base px-2 py-1 transition-opacity duration-300 hover:opacity-75"
          >
            <GoogleIcon />
            <p className="text-sm">Log in with Google</p>
          </button>
          <div className="mb-4 flex flex-row items-center">
            <hr className="w-24 border border-gray-primary" />
            <p className="mx-3 text-gray-medium">or</p>
            <hr className="w-24 border border-gray-primary" />
          </div>

          <div className="mb-4">
            <input
              className="text-gray-700 my-2 mb-3 w-full appearance-none rounded border border-gray-primary px-3 py-2 text-xs leading-tight focus:border-gray-medium focus:outline-none"
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              className="text-gray-700 mb-3 w-full appearance-none rounded border border-gray-primary px-3 py-2 text-xs leading-tight focus:border-gray-medium focus:outline-none"
              name="fullName"
              type="fullName"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleChange}
            />
            <input
              className="text-gray-700 mb-3 w-full appearance-none rounded border border-gray-primary px-3 py-2 text-xs leading-tight focus:border-gray-medium focus:outline-none"
              name="email"
              placeholder="Phone number, or email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="text-gray-700 w-full appearance-none rounded border border-gray-primary px-3 py-2 text-xs leading-tight focus:border-gray-medium focus:outline-none"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errorMessage && (
              <span className="my-5 block text-center text-sm text-red-primary">
                {errorMessage}
              </span>
            )}
            <p className="my-3 text-center text-xs text-gray-medium">
              People who use our service may have uploaded your contact information to Instagram.
              Learn More
            </p>
            <p className="my-3 text-center text-xs text-gray-medium">
              By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .
            </p>
            <button
              className="focus:shadow-outline mb-4 h-8 w-full rounded bg-blue-400 px-4 py-1 text-white hover:bg-blue-primary focus:outline-none disabled:bg-blue-200"
              disabled={
                formData.email === "" ||
                formData.password === "" ||
                formData.username === "" ||
                formData.fullName === "" ||
                isLoading
              }
            >
              {isLoading ? <AuthLoader /> : <h3>Sign Up</h3>}
            </button>
          </div>
        </form>
        <div className="flex w-full justify-center gap-2 rounded border border-gray-primary bg-white px-7 py-5">
          <p className="text-xs">Have an account?</p>
          <Link to={LOGIN} className="text-xs font-bold text-blue-primary">
            Log in
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
