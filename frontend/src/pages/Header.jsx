import { useState } from "react";
import logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../store/cartSlice";
import CartCanvas from "./CartCanvas";

const Navbar = () => {
  const { currentUser, signOutUser } = useAuth();
  const user = currentUser();
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const onCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

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

  const handleLoginDropdownToggle = () => {
    setIsLoginDropdownOpen(!isLoginDropdownOpen);
  };

  const handleCartIconClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header>
      <nav className="bg-gray-800 text-white py-6 sticky top-0">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center hover:cursor-pointer">
            <img src={logo} alt="Logo" className="h-12 w-12 mr-4" />
            <span className="text-lg font-bold select-none ">ShopEase</span>
          </Link>
          <div className="flex items-center gap-x-3">
            <input
              type="search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="py-2.5 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 w-80"
              placeholder="Search products..."
            />
            <button onClick={handleSearch} className="btn">
              <i className="fa fa-search"></i> Search
            </button>
          </div>
          <div className="flex items-center gap-x-2">
            <button
              onClick={handleCartIconClick}
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded-full ml-4 relative"
            >
              <span className="text-2xl">
                <i className="fa fa-shopping-cart"></i>
              </span>
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-fuchsia-500 text-white font-bold py-0.5 px-2 rounded-full text-xs">
                  {cart.length}
                </span>
              )}
            </button>
            {user ? (
              <button
                onClick={handleLoginDropdownToggle}
                className="bg-gray-800 hover:bg-gray-600 text-white py-2 font-bold rounded-lg"
              >
                &ensp;&ensp;{user.firstName}&ensp;<i className="fa fa-chevron-down"></i>&ensp;&ensp;
                {isLoginDropdownOpen && (
                  <div className="absolute bg-gray-800 text-white p-2 px-4 text-start rounded-lg top-20 right-auto">
                    <div className="flex items-center border-b-2 py-3 border-b-black ">
                      <img
                        src="https://via.placeholder.com/100x100"
                        alt="profile image"
                        className="w-8 h-8 rounded-full"
                      />
                      <small className="text-slate-200 ml-2">{user.role}</small>
                    </div>
                    <ul>
                      {user.role === "seller" && (
                        <li>
                          <Link to="seller/dashboard" className="py-2 hover:text-fuchsia-500">
                            <i className="fa fa-columns"></i> Dashboard
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link to={`/${user.role}/profile`} className="py-2 hover:text-fuchsia-500">
                          <i className="fa fa-user"></i> Profile
                        </Link>
                      </li>
                      <li>
                        <Link onClick={logoutUser} className="py-2 hover:text-fuchsia-500">
                          <i className="fa fa-power-off"></i> Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </button>
            ) : (
              <button
                onClick={handleLoginDropdownToggle}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded-lg"
              >
                &ensp;&ensp;Login&ensp;&ensp;
                {isLoginDropdownOpen && (
                  <div className="absolute text-start bg-gray-800 text-white py-2 px-4 rounded-lg top-20 right-auto">
                    <ul>
                      <li>
                        <Link to="/login/customer" className="py-2 hover:text-fuchsia-500">
                          <i className="fa fa-user"></i> Customer
                        </Link>
                      </li>
                      <li>
                        <Link to="/login/seller" className="py-2 hover:text-fuchsia-500">
                          <i className="fa fa-address-card"></i> Seller
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </button>
            )}
          </div>
        </div>
      </nav>

      <CartCanvas
        show={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={id => () => dispatch(removeFromCart(id))}
        cart={cart}
        onCheckout={onCheckout}
      />
    </header>
  );
};

export default Navbar;
