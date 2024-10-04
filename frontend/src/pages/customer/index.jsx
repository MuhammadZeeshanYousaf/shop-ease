import { Route, Routes } from "react-router-dom";
import Login from "../Login";
import Profile from "./Profile";
import Orders from "../seller/Orders";
import Error from "../Error";

function CustomerPages() {
  return (
    <Routes>
      <Route path="register" element={<Login />} />
      <Route path="profile" element={<Profile />} />
      <Route path="orders" element={<Orders />} />
      <Route path="*" element={<Error code={404} message="Customer Page not found" />} />
    </Routes>
  );
}

export default CustomerPages;
