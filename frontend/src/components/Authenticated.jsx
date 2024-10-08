import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ErrorPage from "../pages/ErrorPage";
// import { useEffect, useRef } from "react";

const Authenticated = ({ type }) => {
  const { user } = useAuth();
  // const location = useLocation();
  // const redirectPath = "/login/" + (location.pathname.includes("seller") ? "seller" : "customer");

  if(user) {
    return user.role !== type ? (
      <ErrorPage code={401} message="You are not authorized to access this page!" />
    ) : (
      <Outlet />
    );
  }

};

export default Authenticated;
