import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthenticationGuard from "./components/AuthenticationGuard";
import Layout from "./components/Layout";
import ErrorPage from "./error-page";
import Calendar from "./routes/Calendar";
import MyLists from "./routes/MyLists";
import MyTasks from "./routes/MyTasks";
import Preferences from "./routes/Preferences";
import ProfileSettings from "./routes/ProfileSettings";
import Root from "./routes/root";
import SecretPage from "./SecretPage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path:
      "/tasks",
    element: <MyTasks />
  },
  {
    path: "/lists",
    element: <MyLists />
  },
  {
    path: '/calendar',
    element: <Calendar />
  },
  {
    path: '/profile',
    element: <ProfileSettings />
  },
  {
    path: '/preferences',
    element: <Preferences />
  },
  {
    path: "/secret",
    element: <AuthenticationGuard component={SecretPage} />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}>
        <Layout />
        <RouterProvider router={router} />
      </Auth0Provider>
    </ChakraProvider>
  </React.StrictMode>
);
