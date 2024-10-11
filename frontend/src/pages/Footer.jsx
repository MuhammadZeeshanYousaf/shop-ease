import { useState } from "react";
import logo from "../assets/images/logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSuccess(true);
    setEmail("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center mb-12">
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">
          <div className="flex items-center">
            <img alt="ShopEase" src={logo} className="w-28 h-auto mr-4 mb-4" />
            <h1 className="text-3xl font-bold">Shop Ease</h1>
          </div>
            {/* <h5 className="uppercase text-lg font-bold mb-4">About Us</h5> */}
            <p className="text-gray-400 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat.
            </p>
            <ul className="list-none mb-0">
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  Our Story
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  Our Team
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">
            <h5 className="uppercase text-lg font-bold mb-4">Customer Service</h5>
            <ul className="list-none mb-0">
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  FAQs
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">
            <h5 className="uppercase text-lg font-bold mb-4">Stay Connected</h5>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full py-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <button
                type="submit"
                className="mt-4 py-2 px-4 bg-fuchsia-500 hover:bg-fuchsia-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
              >
                Subscribe
              </button>
              {success && <p className="text-green-400 mt-2">Thank you for subscribing!</p>}
            </form>
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-400 mb-4">&copy; 2023 Shop Ease. All rights reserved.</p>
          <ul className="list-none mb-0 flex justify-center">
            <li className="mr-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fa fa-facebook-f"></i>
              </a>
            </li>
            <li className="mr-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li className="mr-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fa fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
