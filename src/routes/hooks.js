import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { AUTH0_AUDIENCE, TDL_API_URL } from "../constants/paths";

export const useAxios = () => {
  const [axiosInstance, setAxiosInstance] = useState({});
  const {getAccessTokenWithPopup , isLoading} = useAuth0();
 

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: AUTH0_AUDIENCE,
        },
      });


      return accessToken;
    }

    if (!isLoading) {
      const instance = axios.create({
      baseURL: TDL_API_URL,
    });
  
      

    instance.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        const auth = token ? `Bearer ${token}` : '';
        config.headers.Authorization = auth;
        return config;
      },
      (error) => Promise.reject(error),
    );


    setAxiosInstance({ instance });
  
  };
  return () => {
    setAxiosInstance({});
      };

  }, [isLoading, getAccessTokenWithPopup]);

  return axiosInstance.instance;
};
