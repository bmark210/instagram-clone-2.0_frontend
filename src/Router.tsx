// import Layout from "@layouts/Layout";
// import Feed from "@pages/Feed";
// import Login from "@pages/Login";

import { Navigate, createBrowserRouter } from "react-router-dom";
import loadable from "@loadable/component";
import AuthLayout from "./layouts/AuthLayout.tsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed.tsx";
import Profile from "./pages/Profile.tsx";
import Search from "./pages/Search.tsx";
import pMinDelay from "p-min-delay";
import InstagramLoader from "./components/common/InstagramLoader.tsx";
import Saved from "./components/Saved.tsx";
import Tagged from "./components/Tagged.tsx";
import Explore from "./pages/Explore.tsx";
import AuthProtection from "./AuthSecurity.tsx";
import Settings from "./pages/Settings.tsx";
import EditProfile from "./components/Settings/EditProfile.tsx";
import AppsAndWebsites from "./components/Settings/AppsAndWebsites.tsx";
import Publications from "./components/Publications.tsx";
import AllSuggestions from "./components/rigthSideBar/allSuggestions.tsx";

const MainLayout = loadable(
  () => pMinDelay(import("./layouts/MainLayout.tsx"), 400),
  {
    fallback: <InstagramLoader />,
  }
);

// const AuthLayout = loadable(
// 	() => pMinDelay(import('@layouts/AuthLayout'), 200),
// 	{
// 		fallback: <PagePreloader />,
// 	}
// )

// )
// const Profile = loadable(
// 	() => pMinDelay(import('@pages/profile/Profile'), 200),
// 	{
// 		fallback: <PagePreloader />,
// 	}
// )
// const Registration = loadable(
// 	() => pMinDelay(import('@pages/registration/Registration'), 200),
// 	{
// 		fallback: <PagePreloader />,
// 	}
// )
// const ChangePassword = loadable(
// 	() =>
// 		pMinDelay(import('@pages/settings/change-password/ChangePassword'), 200),
// 	{
// 		fallback: <PagePreloader />,
// 	}
// )
// const EditProfile = loadable(
// 	() => pMinDelay(import('@pages/settings/edit-profile/EditProfile'), 200),
// 	{
// 		fallback: <PagePreloader />,
// 	}
// )

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProtection />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/feed" />,
          },
          {
            path: "/feed",
            element: <Feed />,
          },
          {
            path: "/search",
            element: <Search />,
          },
          {
            path: "/explore/",
            element: <Explore />,
          },
          {
            path: "/explore/people",
            element: <AllSuggestions />,
          },
          {
            path: "/:username/",
            element: <Profile />,
            children: [
              {
                path: "/:username/",
                element: <Publications posts={[]} isCurrentUser />,
              },
              {
                path: "/:username/saved",
                element: <Saved />,
              },
              {
                path: "/:username/tagged",
                element: <Tagged />,
              },
            ],
          },
          {
            path: "/settings/",
            element: <Settings />,
            children: [
              {
                index: true,
                element: <Navigate to="/settings/edit" />,
              },
              {
                path: "edit",
                element: <EditProfile />,
              },
              {
                path: "manage_access",
                element: <AppsAndWebsites />,
              },
            ],
          },
        ],
      },
      {
        path: "",
        element: <AuthLayout />,
        children: [
          {
            path: "/auth/login",
            element: <Login />,
          },
          {
            path: "/auth/register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

export const rootNavigate = router.navigate;
