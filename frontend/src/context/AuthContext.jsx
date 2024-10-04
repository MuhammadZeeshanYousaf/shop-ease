import { createContext, useContext, useLayoutEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use(config => {
      config.headers.Authorization = !config._retry && userToken ? `Bearer ${userToken}` : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [userToken]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      response => response.data,
      async error => {
        const originalReq = error.config;

        if (
          error.response.status === 403 &&
          error.response.data.ok === false &&
          error.response.data.message === "Token invalid"
        ) {
          try {
            const res = await api.get("/refresh");

            setUserToken(res.data.token);

            originalReq.headers.Authorization = `Bearer ${res.data.token}`;
            originalReq._retry = true;

            return api(originalReq);
          } catch {
            setUserToken(null);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  return <AuthContext.Provider value={{ userToken, setUserToken, user, setUser }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error("AuthContext must be used within provider");

  return authContext;
};

export { useAuth, AuthProvider };
