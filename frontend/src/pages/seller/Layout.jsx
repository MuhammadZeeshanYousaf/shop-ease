import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { capitalize } from "../../utils/helpers";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";

function Layout() {
  const location = useLocation();
  const { currentUser, signOutUser } = useAuth();
  const user = currentUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const currentPath = location.pathname;
  const pathNames = currentPath.split("/");
  const activeTab = pathNames[pathNames.length - 1].split("?")[0];

  const logoutUser = () => {
    if (user) {
      api
        .delete("/logout")
        .then(res => {
          if (res.data.ok) {
            signOutUser();
            toast.success(res.data.message);
          } else {
            alert(res.data.message);
          }
        })
        .catch(e => {
          console.error(e.response.data?.message || e.message);
        });
    }
  };

  return (
    <main className="flex h-screen bg-fuchsia-50">
      {/* Left Side Menu Bar */}
      <div
        className={`lg:w-64 xl:w-80 h-screen p-4 bg-white border-r border-gray-200 lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:overflow-y-auto transform transition-transform duration-300 ease-in-out 
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 absolute`}
      >
        <div className="flex items-center justify-between mb-5 mt-2">
          <Link
            to="/"
            className="text-xl font-extrabold font-mono text-fuchsia-950 border-x-8 m-2 px-2 border-fuchsia-300 uppercase w-full hover:cursor-pointer select-none"
          >
            <img src={logo} alt="" className="w-12 inline-block mr-3" />
            <nobr>Shop Ease</nobr>
          </Link>
          <button
            className="text-2xl hover:bg-fuchsia-100 hover:text-fuchsia-600 bg-opacity-5 rounded-full cursor-pointer px-1.5 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            &times;
          </button>
        </div>

        {/* Tabs */}
        <ul>
          <li className="mb-2">
            <Link
              to="/seller/products"
              className={`w-full p-3 text-left rounded-md ${
                activeTab === "products" || activeTab === "dashboard"
                  ? "btn btn-gradient"
                  : "text-gray-600 hover:bg-fuchsia-100 hover:text-fuchsia-600"
              }`}
            >
              <i className="fa fa-cube"></i> Products
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/seller/orders"
              className={`w-full p-3 text-left rounded-md ${
                activeTab === "orders"
                  ? "btn btn-gradient"
                  : "text-gray-600 hover:bg-fuchsia-100 hover:text-fuchsia-600"
              }`}
            >
              <i className="fa fa-list-alt"></i> Orders
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/seller/customers"
              className={`w-full p-3 text-left rounded-md ${
                activeTab === "customers"
                  ? "btn btn-gradient"
                  : "text-gray-600 hover:bg-fuchsia-100 hover:text-fuchsia-600"
              }`}
            >
              <i className="fa fa-users"></i> Customers
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Right Content */}
      <div className="flex-1 pt-1 pb-4 mx-3 lg:ml-64 xl:ml-[21rem] xl:mr-5">
        {/* Header */}
        <div className="container border my-4 mx-auto p-3 bg-white shadow-lg shadow-fuchsia-200 rounded-md">
          <div className="flex flex-row justify-between items-center">
            <div>
              <button className="lg:hidden text-2xl mr-3" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <i className="fa fa-bars text-black"></i>
              </button>
              <h2 className="text-xl font-semibold p-2 inline-block">{capitalize(activeTab)}</h2>
            </div>
            <div
              className="flex items-center rounded-lg p-2 hover:bg-gray-200 hover:cursor-pointer"
              onMouseEnter={() => setIsProfileDropdown(true)}
              onMouseLeave={() => setIsProfileDropdown(false)}
              onClick={() => setIsProfileDropdown(!isProfileDropdown)}
            >
              <img
                src="https://via.placeholder.com/100x100"
                alt="profile image"
                className="w-9 h-9 rounded-full mr-2"
              />
              <p className="text-black font-semibold">
                Zeeshan Yousaf&ensp;<i className="fa fa-chevron-down"></i>
              </p>
              {isProfileDropdown && (
                <div className="absolute drop-shadow-lg bg-white py-2 px-6 text-lg rounded-lg top-[5.3rem] right-auto">
                  <ul>
                    <li className="border-b">
                      <Link to="/seller/profile" className="py-2 px-4 hover:text-fuchsia-500 text-nowrap">
                        <i className="fa fa-user"></i> Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={logoutUser} className="py-2 px-4 hover:text-fuchsia-500 text-nowrap">
                        <i className="fa fa-power-off"></i> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content will render here */}
        <div className="container mx-auto bg-white rounded-md p-10 shadow-lg">
          <Outlet />
        </div>
      </div>
      <Toaster position="top-center" containerClassName="adjust-toast" />
    </main>
  );
}

export default Layout;
