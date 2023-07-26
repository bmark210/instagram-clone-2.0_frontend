import { Navigate, createBrowserRouter } from "react-router-dom";
import loadable from "@loadable/component";
import AuthLayout from "./layouts/AuthLayout.tsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed.tsx";
import Profile from "./pages/Profile.tsx";
import pMinDelay from "p-min-delay";
import InstagramLoader from "./components/common/loaders/InstagramLoader.tsx";
import Saved from "./pages/Saved.tsx";
import Tagged from "./pages/Tagged.tsx";
import Explore from "./pages/Explore.tsx";
import AuthProtection from "./security/AuthSecurity.tsx";
import Settings from "./pages/Settings.tsx";
import EditProfile from "./components/settings/EditProfile.tsx";
import AppsAndWebsites from "./components/settings/AppsAndWebsites.tsx";
import Publications from "./pages/Publications.tsx";
import AllSuggestions from "./components/rigthSideBar/AllSuggestions.tsx";
import NotFound from "./pages/NotFound.tsx";

const MainLayout = loadable(() => pMinDelay(import("./layouts/MainLayout.tsx"), 400), {
  fallback: <InstagramLoader />,
});

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
                element: <Publications />,
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
          {
            path: "*",
            element: <Navigate to="/not-found" />,
          },
          {
            path: "not-found",
            element: <NotFound />,
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
