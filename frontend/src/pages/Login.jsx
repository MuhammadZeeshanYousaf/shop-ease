import { useState } from "react";
import logo from "../assets/images/logo.png";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Login() {
  const { setUserToken } = useAuth();
  const navigate = useNavigate();
  // const [queryParams] = useSearchParams();
  const { role } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginSubmit = event => {
    event.preventDefault();

    if (!email || !password) return;

    api
      .post("/login", { email, password })
      .then(res => {
        if (res.data.ok && res.data.token) {
          setUserToken(res.data.token);
          navigate(`/`);
        } else {
          alert(res.data.message);
        }
      })
      .catch(e => {
        console.error("Login error:", e.response?.data?.message || e.message);
      });
  };

  return (
    <div className="flex justify-center my-10">
      {/*
          This pages requires updating layout:
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="ShopEase" src={logo} className="mx-auto h-28 w-auto" />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onLoginSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-800 text-sm font-bold mb-2">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-gray-800 text-sm font-bold mb-2">
                  Password
                </label>
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-semibold text-purple-600 hover:text-purple-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link to={`/register/${role}`} className="font-semibold leading-6 text-purple-600 hover:text-purple-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
