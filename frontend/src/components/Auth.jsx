import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import Error from "../pages/Error";

const Auth = ({ type }) => {
  const { userToken, setUser } = useAuth();

  if (!userToken) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  const loggedUser = jwtDecode(userToken);
  setUser(loggedUser);
  if (loggedUser.role !== type) return <Error code={401} message="You are not authorized to access this page!" />;

  // If the user is authenticated, render the children (protected component)
  return <Outlet />;
};

export default Auth;
