import { Navigate, createBrowserRouter } from "react-router-dom";
import loadable from "@loadable/component";
import AuthLayout from "./layouts/AuthLayout.tsx";

import pMinDelay from "p-min-delay";

import * as ROUTES from "./constants/routes";

import AllSuggestions from "./pages/AllSuggestions.tsx";
import EditProfile from "./pages/EditProfile.tsx";
import AppsAndWebsites from "./pages/AppsAndWebsites.tsx";
import InstagramLoader from "./components/common/loaders/InstagramLoader.tsx";

import NotFound from "./pages/NotFound.tsx";
import Saved from "./pages/Saved.tsx";
import Tagged from "./pages/Tagged.tsx";
import Explore from "./pages/Explore.tsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile.tsx";
import Feed from "./pages/Feed.tsx";
import Settings from "./pages/Settings.tsx";
import Publications from "./pages/Publications.tsx";
import AuthSecurity from "./security/AuthSecurity.tsx";

const MainLayout = loadable(() => pMinDelay(import("./layouts/MainLayout.tsx"), 400), {
  fallback: <InstagramLoader />,
});

export const router = createBrowserRouter([
  {
    path: ROUTES.AUTH_SECURITY,
    element: <AuthSecurity />,
    children: [
      {
        path: ROUTES.MAIN_LAYOUT,
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.FEED} />,
          },
          {
            path: ROUTES.FEED,
            element: <Feed />,
          },
          {
            path: ROUTES.EXPLORE,
            element: <Explore />,
          },
          {
            path: ROUTES.SUGGESTIONS,
            element: <AllSuggestions />,
          },
          {
            path: ROUTES.PROFILE,
            element: <Profile />,
            children: [
              {
                path: ROUTES.PUBLICATION,
                element: <Publications />,
              },
              {
                path: ROUTES.SAVED,
                element: <Saved />,
              },
              {
                path: ROUTES.TAGGED,
                element: <Tagged />,
              },
            ],
          },
          {
            path: ROUTES.SETTINGS,
            element: <Settings />,
            children: [
              {
                index: true,
                element: <Navigate to={ROUTES.EDIT_PROFILE} />,
              },
              {
                path: ROUTES.EDIT_PROFILE,
                element: <EditProfile />,
              },
              {
                path: ROUTES.MANAGE_ACCESS,
                element: <AppsAndWebsites />,
              },
            ],
          },
          {
            path: ROUTES.ALL,
            element: <Navigate to={ROUTES.NOT_FOUND} />,
          },
          {
            path: ROUTES.NOT_FOUND,
            element: <NotFound />,
          },
        ],
      },
      {
        path: ROUTES.AUTH_LAYOUT,
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.LOGIN,
            element: <Login />,
          },
          {
            path: ROUTES.REGISTER,
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

export const rootNavigate = router.navigate;
