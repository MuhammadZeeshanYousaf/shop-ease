import { createContext, useContext, useLayoutEffect, useState } from "react";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ payload: null, token: null });

  useLayoutEffect(() => {
    console.count("Setting up: Access token inspector...");
    let userToken = user.token;
    if (!userToken) userToken = localStorage.getItem("token");

    // Pre set token for every api call
    const authInterceptor = api.interceptors.request.use(config => {
      config.headers.Authorization = !config._retry && userToken ? `Bearer ${userToken}` : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [user.token]);

  useLayoutEffect(() => {
    console.count("Setting up: Refresh on expire inspector...");
    const refreshInterceptor = api.interceptors.response.use(
      response => response,
      async error => {
        const originalReq = error.config;

        if (
          error.response.status === 403 &&
          error.response.data.ok === false &&
          error.response.data.message === "Token invalid"
        ) {
          try {
            const res = await api.get("/refresh");
            const userToken = res.data.token;

            signInUser(userToken);
            originalReq.headers.Authorization = `Bearer ${userToken}`;
            originalReq._retry = true;

            return api(originalReq);
          } catch {
            localStorage.removeItem("token");
            setUser({ token: null, payload: null });
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  function signOutUser() {
    localStorage.removeItem("token");
    setUser({ token: null, payload: null });
  }

  function signInUser(token) {
    if (token) {
      setUser({ token, payload: jwtDecode(token) });
      localStorage.setItem("token", token);
    } else {
      throw new Error("Cannot sign in user without token!");
    }
  }

  function currentUser() {
    if (user.payload) {
      return user.payload;
    } else if (user.token) {
      const decoded = jwtDecode(user.token);
      // setUser(prev => ({ ...prev, payload: decoded }));
      return decoded;
    } else if (localStorage.getItem("token")) {
      const localToken = localStorage.getItem("token");
      const decoded = jwtDecode(localToken);
      // setUser({ token: localToken, payload: decoded });
      return decoded;
    } else {
      return null;
    }
  }

  return <AuthContext.Provider value={{ signInUser, signOutUser, currentUser }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error("AuthContext must be used within provider");

  return authContext;
};

export { useAuth, AuthProvider };
