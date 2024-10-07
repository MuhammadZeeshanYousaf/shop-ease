import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Error from "../pages/Error";
import api from "../utils/api";
import { useEffect, useRef } from "react";

const Auth = ({ type }) => {
  const { setUserToken, userToken, user } = useAuth();
  const navigate = useNavigate();
  const tokenChecked = useRef(false);

  const refreshTheToken = async () => {
    try {
      const res = await api.get("/refresh");
      return res.data.token;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      // If tokenChecked is true, don't call the API again
      if (!userToken && !tokenChecked.current) {
        tokenChecked.current = true;
        // tries refreshing
        const token = await refreshTheToken();
        if (token) setUserToken(token);
        else navigate("/login");
      }
    };

    checkToken();
  }, []);

  if (!user) {
    return <h2 className="text-center">Loading...</h2>;
  } else {
    return user.role !== type ? <Error code={401} message="You are not authorized to access this page!" /> : <Outlet />;
  }
};

export default Auth;
