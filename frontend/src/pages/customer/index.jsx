import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Orders from "./Orders";
import ErrorPage from "../ErrorPage";

function CustomerPages() {
  return (
    <Routes>
      <Route path="profile" element={<Profile />} />
      <Route path="orders" element={<Orders />} />

      <Route path="*" element={<ErrorPage code={404} message="Customer Page not found" />} />
    </Routes>
  );
}

export default CustomerPages;
