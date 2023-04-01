import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthenticationGuard from "./components/auth/AuthenticationGuard";
import Layout from "./components/Layout";
import ErrorPage from "./error-page";
import Calendar from "./routes/Calendar";
import MyLists from "./routes/MyLists";
import MyTasks from "./routes/MyTasks";
import Preferences from "./routes/Preferences";
import ProfileSettings from "./routes/ProfileSettings";
import HomePage from "./routes/HomePage";
import SecretPage from "./SecretPage";
import { AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN } from "./constants/paths";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  {
    path:
      "/tasks",
    element: <AuthenticationGuard component={MyTasks} />
  },
  {
    path: "/lists",
    element: <AuthenticationGuard component={MyLists} />
  },
  {
    path: '/calendar',
    element: <AuthenticationGuard component={Calendar} />
  },
  {
    path: '/profile',
    element: <AuthenticationGuard component={ProfileSettings} />
  },
  {
    path: '/preferences',
    element: <AuthenticationGuard component={Preferences} />
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
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: AUTH0_AUDIENCE
        }}>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </Auth0Provider>
    </ChakraProvider>
  </React.StrictMode>
);
