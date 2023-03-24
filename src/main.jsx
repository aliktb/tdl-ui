import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthenticationGuard from "./components/AuthenticationGuard";
import ErrorPage from "./error-page";
import FirstUser from "./FirstUser";
import "./index.css";
import Root from "./routes/root";
import SecretPage from "./SecretPage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>
  },
  {
  path: 
    "/contacts/1",
    element: <FirstUser />
  },
  {
    path: "/newpath",
    element: <div>this is a new path!</div>
  },
  {
    path: "/secret",
    element: <AuthenticationGuard component={SecretPage}/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`,
          scope: "read:current_user update:current_user_metadata"
        }}>
      <RouterProvider router={router} />
      </Auth0Provider>
  </React.StrictMode>
);
