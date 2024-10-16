import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ErrorPage from "../pages/ErrorPage";

const Authenticated = ({ type }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const redirectPath = "/login/" + (location.pathname.includes("seller") ? "seller" : "customer");

  console.log("Authenticated component");

  if (currentUser()) {
    const user = currentUser();
    return type === "each" || user.role === type ? (
      <Outlet />
    ) : (
      <ErrorPage code={401} message="You are not authorized to access this page!" />
    );
  } else return <Navigate to={redirectPath} />;
};

export default Authenticated;
