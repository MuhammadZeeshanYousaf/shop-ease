import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Orders from "./Orders";
import ErrorPage from "../ErrorPage";
import Dashboard from "./Dashboard";
import Layout from "./Layout";
import Products from "./Products";
// import CreateProduct from "./Products/Create";
import Customers from "./Customers";

function SellerPages() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders/*" element={<Orders />} />
        <Route path="products/*" element={<Products />} />
        {/* <Route path="products/create" element={<CreateProduct />} /> */}
        <Route path="customers" element={<Customers />} />
      </Route>

      <Route path="*" element={<ErrorPage code={404} message="Seller Page not found" />} />
    </Routes>
  );
}

export default SellerPages;
