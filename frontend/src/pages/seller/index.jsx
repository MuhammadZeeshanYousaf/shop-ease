import { Route, Routes } from "react-router-dom";
import Login from "../Login";
import Profile from "./Profile";
import Orders from "./Orders";
import ErrorPage from "../ErrorPage";

function SellerPages() {
  return (
    <Routes>
      <Route path="register" element={<Login />} />
      <Route path="profile" element={<Profile />} />
      <Route path="orders" element={<Orders />} />
      <Route path="*" element={<ErrorPage code={404} message="Seller Page not found" />} />
    </Routes>
  );
}

export default SellerPages;
