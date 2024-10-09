import { createContext, useContext, useLayoutEffect, useState } from "react";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ payload: null, token: null });

  useLayoutEffect(() => {
    console.count("Token Setting Inspector");
    if (!user.token && localStorage.getItem("token")) {
      const localToken = localStorage.getItem("token");
      setUser({ token: localToken, payload: jwtDecode(localToken) });
    }

    // set token for every api call
    const authInterceptor = api.interceptors.request.use(config => {
      config.headers.Authorization =
        !config._retry && user.token ? `Bearer ${user.token}` : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [user.token]);

  useLayoutEffect(() => {
    console.count("Error checking Inspector");
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

            setUser({ token: res.data.token });

            originalReq.headers.Authorization = `Bearer ${res.data.token}`;
            originalReq._retry = true;

            return api(originalReq);
          } catch {
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
    setUser({ token: null, payload: null });
    localStorage.removeItem("token");
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
