import { useState } from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const handleLoginDropdownToggle = () => {
    setIsLoginDropdownOpen(!isLoginDropdownOpen);
  };

  const handleCartIconClick = () => {
    console.log("Cart icon clicked");
    setCartItemCount(prevCount => prevCount + 1);
  };

  return (
    <header>
      <nav className="bg-gray-800 text-white py-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center hover:cursor-pointer">
            <img src={logo} alt="Logo" className="h-12 w-12 mr-4" />
            <span className="text-lg font-bold select-none ">ShopEase</span>
          </Link>
          <div className="flex items-center">
            <input
              type="search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="py-2.5 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 w-80"
              placeholder="Search products..."
            />
            <button
              onClick={handleSearch}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
            >
              <i className="fa fa-search"></i> Search
            </button>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleCartIconClick}
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full ml-4 relative text-2xl"
            >
              <i className="fa fa-shopping-cart"></i>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-purple-500 text-white font-bold py-1 px-2 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={handleLoginDropdownToggle}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded-lg"
            >
              &ensp;&ensp;Login&ensp;&ensp;
              {isLoginDropdownOpen && (
                <div className="absolute bg-gray-800 text-white py-2 px-4 rounded-lg top-16 right-auto">
                  <ul>
                    <li className="py-2 hover:text-purple-500">
                      <Link to="/login">Login</Link>
                    </li>
                    <li className="py-2 hover:text-purple-500">
                      <Link to="/register">Register</Link>
                    </li>
                  </ul>
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
